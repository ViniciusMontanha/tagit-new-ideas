// Wait for the selected image before revealing the hero; never wait indefinitely.
export const prepareHeroImage = (src: string, signal: AbortSignal): Promise<boolean> => {
  if (signal.aborted) return Promise.resolve(false);

  return new Promise((resolve) => {
    const image = new Image();
    let settled = false;

    const finish = (loaded: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      signal.removeEventListener("abort", onAbort);
      image.onload = null;
      image.onerror = null;
      resolve(loaded);
    };
    const onAbort = () => finish(false);
    const timeoutId = window.setTimeout(() => finish(false), 8000);

    signal.addEventListener("abort", onAbort, { once: true });
    image.fetchPriority = "high";
    image.onload = async () => {
      // Some browsers can load an image even when decode() rejects.
      await image.decode().catch(() => undefined);
      finish(image.naturalWidth > 0);
    };
    image.onerror = () => finish(false);
    image.src = src;
  });
};
