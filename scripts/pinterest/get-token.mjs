// ONE-TIME local helper to get your Pinterest refresh token + board IDs.
// You run this once on your own computer (it is NOT part of the cron).
//
// Usage:
//   1. Create a Pinterest app (see PINTEREST_SETUP.md) and copy its App ID + secret.
//   2. In the app settings, add this redirect URI:  http://localhost:8080/callback
//   3. Run:
//        PINTEREST_APP_ID=xxx PINTEREST_APP_SECRET=yyy node scripts/pinterest/get-token.mjs
//      (On Windows PowerShell:
//        $env:PINTEREST_APP_ID="xxx"; $env:PINTEREST_APP_SECRET="yyy"; node scripts/pinterest/get-token.mjs )
//   4. Your browser opens → click "Authorize" → come back to the terminal.
//   5. Copy the printed REFRESH TOKEN and BOARD IDs into your GitHub secrets.

import { createServer } from "node:http";
import { exec } from "node:child_process";

const APP_ID = process.env.PINTEREST_APP_ID;
const APP_SECRET = process.env.PINTEREST_APP_SECRET;
const REDIRECT = "http://localhost:8080/callback";
const SCOPES = "boards:read,boards:write,pins:read,pins:write";

if (!APP_ID || !APP_SECRET) {
  console.error("Set PINTEREST_APP_ID and PINTEREST_APP_SECRET env vars first.");
  process.exit(1);
}

const authUrl =
  `https://www.pinterest.com/oauth/?client_id=${APP_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT)}` +
  `&response_type=code&scope=${encodeURIComponent(SCOPES)}&state=setup`;

function openBrowser(url) {
  const cmd =
    process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
      ? `open "${url}"`
      : `xdg-open "${url}"`;
  exec(cmd);
}

async function exchangeCode(code) {
  const basic = Buffer.from(`${APP_ID}:${APP_SECRET}`).toString("base64");
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT,
  });
  const res = await fetch("https://api.pinterest.com/v5/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

async function fetchBoards(accessToken) {
  const res = await fetch("https://api.pinterest.com/v5/boards?page_size=100", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  return data.items || [];
}

const server = createServer(async (req, res) => {
  if (!req.url.startsWith("/callback")) {
    res.writeHead(404).end();
    return;
  }
  const url = new URL(req.url, REDIRECT);
  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400).end("No code received.");
    return;
  }
  try {
    const tokens = await exchangeCode(code);
    const boards = await fetchBoards(tokens.access_token);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h2>✅ Success! Return to your terminal.</h2>");

    console.log("\n========================================");
    console.log("✅ COPY THESE INTO YOUR GITHUB SECRETS:");
    console.log("========================================\n");
    console.log("PINTEREST_REFRESH_TOKEN =\n  " + tokens.refresh_token + "\n");
    if (boards.length) {
      console.log("Your boards (use the id after '=' for PINTEREST_BOARD_IDS):");
      for (const b of boards) console.log(`  ${b.name} = ${b.id}`);
    } else {
      console.log("No boards yet — create a board on pinterest.com, then re-run.");
    }
    console.log("\nPINTEREST_BOARD_IDS = comma-separated board id(s) above");
    console.log("========================================\n");
  } catch (err) {
    res.writeHead(500).end("Token exchange failed. See terminal.");
    console.error("Token exchange failed:", err.message);
  } finally {
    setTimeout(() => server.close(() => process.exit(0)), 500);
  }
});

server.listen(8080, () => {
  console.log("Opening Pinterest authorization in your browser...");
  console.log("If it doesn't open, paste this URL manually:\n" + authUrl + "\n");
  openBrowser(authUrl);
});
