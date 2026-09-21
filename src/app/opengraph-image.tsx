import { ImageResponse } from "next/og";

export const alt = "Impactional — Your ideas can move the world";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f6f1e9", color: "#14352b", padding: "70px 80px" }}>
      <div style={{ display: "flex", fontSize: 32, letterSpacing: 5 }}>IMPACTIONAL</div>
      <div style={{ display: "flex", fontSize: 86, lineHeight: 1.05, maxWidth: 950 }}>Your ideas can move the world.</div>
      <div style={{ display: "flex", fontSize: 27 }}>A global community of young changemakers · impactional.net</div>
    </div>,
    size,
  );
}
