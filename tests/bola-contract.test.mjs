import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const route = await readFile(new URL("../app/api/accounts/[id]/route.ts", import.meta.url), "utf8");
const data = await readFile(new URL("../app/lib/data.ts", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

test("accounts route exports GET at the requested dynamic route", () => {
  assert.match(route, /export\s+async\s+function\s+GET/);
  assert.match(readme, /app\/api\/accounts\/\[id\]\/route\.ts/);
  assert.match(readme, /\/api\/accounts\/acct_northstar_001/);
});

test("response nests and renames the owner field as data.account.holderId", () => {
  assert.match(route, /data:\s*{/);
  assert.match(route, /account:\s*{/);
  assert.match(route, /holderId:\s*account\.holderId/);
  assert.match(data, /holderId:\s*"usr_101"/);
});

test("route is intentionally authenticated but not holder scoped", () => {
  assert.match(route, /requireUserResponse/);
  assert.doesNotMatch(route, /account\.holderId\s*!==\s*auth\.user\.id/);
  assert.doesNotMatch(route, /account\.holderId\s*===\s*auth\.user\.id/);
  assert.match(route, /Intentional BOLA/);
});
