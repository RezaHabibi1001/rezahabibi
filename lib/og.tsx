import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const OG_SIZE = { width: 1200, height: 630 };

let portrait: Promise<string> | null = null;
const portraitDataUrl = () =>
  (portrait ??= readFile(path.join(process.cwd(), "assets", "og-portrait.jpeg")).then(
    (b) => `data:image/jpeg;base64,${b.toString("base64")}`,
  ));

type Card = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  bg?: string;
  ink?: string;
  withPortrait?: boolean;
};

/** Shared 1200x630 social card used by every opengraph-image / twitter-image route. */
export async function renderOg({ eyebrow, title, subtitle, bg = "#fcf9f8", ink = "#e45684", withPortrait = true }: Card) {
  const img = withPortrait ? await portraitDataUrl() : null;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", padding: 40 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            borderRadius: 36,
            background: bg,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "56px 64px",
              width: img ? 700 : "100%",
            }}
          >
            <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: ink }}>
              {eyebrow}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", fontSize: title.length > 48 ? 54 : 66, lineHeight: 1.1, color: "#101010" }}>
                {title}
              </div>
              {subtitle ? (
                <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, color: "#202020", opacity: 0.75 }}>
                  {subtitle}
                </div>
              ) : null}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#202020" }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "#202020",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                }}
              >
                R
              </div>
              {site.name} · {site.role}
            </div>
          </div>
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} width={420} height={411} alt="" style={{ position: "absolute", right: 24, bottom: 0 }} />
          ) : null}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
