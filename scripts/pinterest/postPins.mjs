// Main entry point. Run daily by GitHub Actions (or locally).
// Picks the next few un-posted pins, posts them to Pinterest, records state.
//
// Env vars (set as GitHub secrets for CI):
//   PINTEREST_APP_ID, PINTEREST_APP_SECRET, PINTEREST_REFRESH_TOKEN  (required)
//   PINTEREST_BOARD_IDS   comma-separated board id(s) to rotate through (required)
//   PINS_PER_RUN          how many pins per run (default 4)
//   DRY_RUN               "1" = generate + log but DON'T post (for testing)

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildPinQueue } from "./generateCopy.mjs";
import { getAccessToken, createPin, listBoards } from "./pinterestClient.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_PATH = join(__dirname, "..", "..", "src", "data", "products.json");
const STATE_PATH = join(__dirname, "state.json");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function loadJson(path, fallback) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return fallback;
  }
}

async function main() {
  const dryRun = process.env.DRY_RUN === "1";
  const perRun = parseInt(process.env.PINS_PER_RUN || "4", 10);
  const boardIds = (process.env.PINTEREST_BOARD_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const products = await loadJson(PRODUCTS_PATH, []);
  if (!products.length) throw new Error(`No products found at ${PRODUCTS_PATH}`);

  const queue = buildPinQueue(products);
  const state = await loadJson(STATE_PATH, { posted: [] });
  const postedSet = new Set(state.posted);

  let pending = queue.filter((pin) => !postedSet.has(pin.key));

  // When everything has been posted once, start a fresh cycle (re-pinning over
  // time is fine and keeps the account active). Reset state and reshuffle order.
  if (pending.length === 0) {
    console.log("All pins posted once — starting a new cycle.");
    state.posted = [];
    postedSet.clear();
    pending = queue.slice();
  }

  const batch = pending.slice(0, perRun);
  console.log(
    `Queue: ${queue.length} total | ${pending.length} pending | posting ${batch.length} this run${
      dryRun ? " (DRY RUN)" : ""
    }`
  );

  if (dryRun) {
    for (const pin of batch) {
      console.log("\n----------------------------------------");
      console.log("TITLE:", pin.title);
      console.log("DESC :", pin.description);
      console.log("IMG  :", pin.imageUrl);
      console.log("LINK :", pin.link);
    }
    console.log("\nDRY RUN complete — nothing was posted.");
    return;
  }

  // --- Live posting path ---
  const appId = required("PINTEREST_APP_ID");
  const appSecret = required("PINTEREST_APP_SECRET");
  const refreshToken = required("PINTEREST_REFRESH_TOKEN");
  if (!boardIds.length) throw new Error("PINTEREST_BOARD_IDS is required");

  const accessToken = await getAccessToken({ appId, appSecret, refreshToken });

  // Sanity-check the board ids exist on this account.
  const boards = await listBoards(accessToken);
  const validIds = new Set(boards.map((b) => b.id));
  const usableBoards = boardIds.filter((id) => validIds.has(id));
  if (!usableBoards.length) {
    throw new Error(
      `None of PINTEREST_BOARD_IDS match this account. Your boards: ${boards
        .map((b) => `${b.name}=${b.id}`)
        .join(", ")}`
    );
  }

  let posted = 0;
  for (let i = 0; i < batch.length; i++) {
    const pin = batch[i];
    const boardId = usableBoards[i % usableBoards.length];
    try {
      const result = await createPin(accessToken, { ...pin, boardId });
      state.posted.push(pin.key);
      posted++;
      console.log(`✓ Pinned "${pin.title}" (pin ${result.id}) to board ${boardId}`);
    } catch (err) {
      console.error(`✗ Failed "${pin.title}": ${err.message}`);
    }
    // Space out posts so the activity looks organic (and respects rate limits).
    if (i < batch.length - 1) await sleep(20_000);
  }

  await writeFile(STATE_PATH, JSON.stringify(state, null, 2));
  console.log(`\nDone. Posted ${posted}/${batch.length}. State saved.`);
}

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
