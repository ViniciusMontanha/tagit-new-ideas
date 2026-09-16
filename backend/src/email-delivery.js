import { createHash } from "node:crypto";

export function deliveryKey(requestId, data, recipient) {
  const hex = createHash("sha256").update(JSON.stringify([requestId, data, recipient])).digest("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-5${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

async function sendOnce(send, message) {
  try {
    const response = await send(message);
    return { accepted: true, messageId: response?.body?.messageId };
  } catch (error) {
    const body = error?.response?.body;
    // A Brevo não reenvia a mensagem quando reconhece a mesma chave.
    if (body?.code === "duplicate_parameter" && /idempoten/i.test(body?.message || "")) {
      return { accepted: true, replayed: true };
    }
    return { accepted: false, code: body?.code || "provider_error" };
  }
}

export async function deliverContactEmails({ send, admin, client, requestId, data }) {
  admin.headers = { ...admin.headers, idempotencyKey: deliveryKey(requestId, data, "admin") };
  client.headers = { ...client.headers, idempotencyKey: deliveryKey(requestId, data, "client") };
  const adminResult = await sendOnce(send, admin);
  if (!adminResult.accepted) return { success: false, adminAccepted: false, confirmationSent: false, code: adminResult.code };
  const clientResult = await sendOnce(send, client);
  return {
    success: true,
    adminAccepted: true,
    confirmationSent: clientResult.accepted,
    adminMessageId: adminResult.messageId,
    clientMessageId: clientResult.messageId,
    replayed: !!adminResult.replayed,
  };
}
