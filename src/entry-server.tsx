import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { PassThrough } from "node:stream";
import App from "./App";

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    let failed: unknown;
    const timer = setTimeout(() => { stream.abort(); reject(new Error(`Prerender timed out: ${url}`)); }, 20000);
    output.on("data", chunk => chunks.push(Buffer.from(chunk)));
    output.on("end", () => { clearTimeout(timer); if (failed) reject(failed); else resolve(Buffer.concat(chunks).toString("utf8")); });
    output.on("error", error => { clearTimeout(timer); reject(error); });
    const stream = renderToPipeableStream(<StaticRouter location={url}><App /></StaticRouter>, {
      onAllReady() { stream.pipe(output); },
      onShellError(error) { clearTimeout(timer); reject(error); },
      onError(error) { failed = error; },
    });
  });
}
