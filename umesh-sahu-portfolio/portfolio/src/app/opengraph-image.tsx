import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}: Data Engineer portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#07101e",
          color: "#e8eff9",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700 }}>{site.name}</div>
        <div style={{ fontSize: 34, marginTop: 18, color: "#54acff" }}>{site.headline}</div>
        <div style={{ display: "flex", marginTop: 56, gap: 14 }}>
          {[
            ["Source", "#8c9eb8"],
            ["Bronze", "#d68a48"],
            ["Silver", "#aab8cc"],
            ["Gold", "#ecbe46"],
          ].map(([label, color]) => (
            <div
              key={label}
              style={{ border: `2px solid ${color}`, color, padding: "10px 22px", fontSize: 26, borderRadius: 10 }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
