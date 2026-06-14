import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Aayas Creation — Handmade Artisan Earrings, crafted in Ahmedabad, India";

// Branded social-share card, generated at build/request time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#FFFCF7",
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(250,191,166,0.45), transparent 42%), radial-gradient(circle at 84% 80%, rgba(212,175,55,0.30), transparent 45%)",
          fontFamily: "Georgia, serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 14,
            textTransform: "uppercase",
            color: "#E05C42",
            marginBottom: 28,
          }}
        >
          Handmade · Ahmedabad · India
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 116,
            color: "#2B2A27",
            lineHeight: 1,
            fontWeight: 600,
          }}
        >
          Aayas Creation
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 44,
            color: "#6A655A",
            marginTop: 30,
            fontStyle: "italic",
          }}
        >
          Adornments crafted with soul.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            padding: "16px 44px",
            background: "#2B2A27",
            color: "#FFFCF7",
            borderRadius: 999,
            fontSize: 26,
            letterSpacing: 2,
            fontFamily: "Arial, sans-serif",
          }}
        >
          Handmade Artisan Earrings
        </div>
      </div>
    ),
    { ...size }
  );
}
