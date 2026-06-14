// Thin Pinterest API v5 client. Uses Node's built-in global fetch (Node 18+),
// so there are ZERO npm dependencies to install.

const API = "https://api.pinterest.com/v5";

// Exchange a long-lived refresh token for a short-lived access token.
// This is what lets the GitHub Action run unattended — we never store the
// access token, only the refresh token (as a GitHub secret).
export async function getAccessToken({ appId, appSecret, refreshToken }) {
  const basic = Buffer.from(`${appId}:${appSecret}`).toString("base64");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
  const res = await fetch(`${API}/oauth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      `Token refresh failed (${res.status}): ${JSON.stringify(data)}`
    );
  }
  return data.access_token;
}

export async function listBoards(accessToken) {
  const res = await fetch(`${API}/boards?page_size=100`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`List boards failed (${res.status}): ${JSON.stringify(data)}`);
  }
  return data.items || [];
}

// Create one pin from an image URL (no image hosting needed — Pinterest fetches it).
export async function createPin(accessToken, { boardId, title, description, link, imageUrl }) {
  const res = await fetch(`${API}/pins`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      board_id: boardId,
      title,
      description,
      link,
      media_source: {
        source_type: "image_url",
        url: imageUrl,
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Create pin failed (${res.status}): ${JSON.stringify(data)}`);
  }
  return data; // includes pin id
}
