# Pinterest Auto-Pin Engine — Setup (one time, ~30 min)

This posts keyword-optimized pins of your earrings to Pinterest **every day,
automatically and for free**, sending shoppers to your Amazon listings.
You set it up once. After that it runs itself — you do nothing.

> Why Pinterest? It's a visual *search* engine. People search "boho earrings",
> "jhumka for festival", etc., and pins keep showing up for months/years. Unlike
> the old browser extension, this is 100% allowed — it's your own content on your
> own account, so there is no risk to your Amazon seller account.

---

## Step 1 — Create a free Pinterest Business account
1. Go to https://www.pinterest.com/business/create/ and sign up (free).
2. Create a few **boards** that match your styles, e.g.:
   - "Handmade Boho Earrings"
   - "Festival & Ethnic Jewelry"
   - "Jhumka Earrings"
   Each board is just a folder for pins. The engine rotates pins across them.

## Step 2 — Create a Pinterest developer app
1. Go to https://developers.pinterest.com/apps/ and click **Connect app** /
   **Create app**.
2. Give it a name (e.g. "Aayas Auto Pin").
3. In the app settings, find **Redirect URIs** and add exactly:
   ```
   http://localhost:8080/callback
   ```
4. Copy your **App ID** and **App secret key** — you'll need them next.

## Step 3 — Get your refresh token + board IDs (run the helper once)
On your own computer, in the project folder, run:

**Windows PowerShell:**
```powershell
$env:PINTEREST_APP_ID="YOUR_APP_ID"; $env:PINTEREST_APP_SECRET="YOUR_SECRET"; node scripts/pinterest/get-token.mjs
```
**Mac/Linux:**
```bash
PINTEREST_APP_ID=YOUR_APP_ID PINTEREST_APP_SECRET=YOUR_SECRET node scripts/pinterest/get-token.mjs
```

Your browser opens → click **Authorize**. Come back to the terminal — it prints:
- `PINTEREST_REFRESH_TOKEN = ...`
- a list of your boards with their IDs

Copy those somewhere for the next step.

## Step 4 — Add secrets to GitHub
In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**.
Add these four:

| Secret name | Value |
|---|---|
| `PINTEREST_APP_ID` | your App ID |
| `PINTEREST_APP_SECRET` | your App secret |
| `PINTEREST_REFRESH_TOKEN` | the refresh token from Step 3 |
| `PINTEREST_BOARD_IDS` | one or more board IDs, comma-separated (e.g. `123,456`) |

## Step 5 — Turn it on & test
1. Commit and push these files (the `scripts/pinterest/` folder and the
   `.github/workflows/pinterest-daily.yml` workflow).
2. In GitHub → **Actions** tab → "Pinterest auto-pin" → **Run workflow**.
   - First set the **dry_run** input to `1` to preview (posts nothing).
   - Then run again with `0` to post for real.
3. After it runs, check your Pinterest profile — your pins are live. 🎉

That's it. From now on it posts **4 pins/day automatically at ~2:30 PM IST**.
You never touch it again.

---

## Tuning (optional)
- **More/fewer pins per day:** edit `PINS_PER_RUN` in
  `.github/workflows/pinterest-daily.yml` (4 is a safe, non-spammy default).
- **Different time:** edit the `cron:` line (it's in UTC).
- **New products:** just add them to `src/data/products.json` like the rest —
  the engine picks them up automatically.

## Bonus — track your Pinterest sales (free)
Sign up for **Amazon Attribution** (free, in Seller Central / Amazon Ads). It
gives you tracking links so you can SEE how many orders Pinterest brings, and
some categories earn a **Brand Referral Bonus** (Amazon pays you ~10% back for
traffic you bring from outside). If you create Attribution links, paste them
into each product's `amazonUrl` in `products.json` and the engine uses them.

## Troubleshooting
- **"None of PINTEREST_BOARD_IDS match this account"** → the board IDs are wrong;
  re-run Step 3 to get the correct IDs.
- **Token refresh failed** → your refresh token expired (rare) or App ID/secret
  is wrong; re-run Step 3 to get a fresh refresh token.
- **Pins rejected** → usually a bad image URL; the script logs which pin failed
  and continues with the rest.
