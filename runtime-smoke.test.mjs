import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";

test("production build includes loadable JavaScript and CSS assets", async () => {
  const html = await readFile(new URL("./dist/index.html", import.meta.url), "utf8");
  const assets = [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)].map(
    ([, path]) => path,
  );

  assert.ok(assets.some((path) => path.endsWith(".js")), "JavaScript entry asset is missing");
  assert.ok(assets.some((path) => path.endsWith(".css")), "CSS entry asset is missing");

  await Promise.all(
    assets.map((path) =>
      access(new URL(`./dist${path.startsWith("/") ? path : `/${path}`}`, import.meta.url)),
    ),
  );
});
