import { ImageResponse } from "next/og";
import { SITE_INFO } from "./constants/constants";


export const alt = `${SITE_INFO.name} - Knjigovodstvene usluge Zagreb`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1e6441",
          backgroundImage:
            "linear-gradient(135deg, #1e6441 0%, #277D4C 50%, #1e6441 100%)",
        }}
      >
        {/* Logo text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "white",
              marginBottom: 8,
              letterSpacing: "-2px",
            }}
          >
            MATKA
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Knjigovodstvene usluge
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 48,
            fontSize: 36,
            color: "white",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Pouzdane knjigovodstvene usluge za poduzeća svih veličina
        </div>

        {/* Location badge */}
        <div
          style={{
            marginTop: 32,
            fontSize: 20,
            color: "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          📍 Zagreb, Hrvatska • Od 1994. godine
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
