import type { Art } from "@/content/site";

// Original SVG illustrations, one per project type.
export default function ProjectArt({ kind, ink }: { kind: Art; ink: string }) {
  const common = { viewBox: "0 0 480 240", className: "block w-full", role: "img" as const };

  if (kind === "ledger") {
    return (
      <svg {...common} aria-label="Append-only ledger illustration">
        <rect x="0" y="20" width="480" height="240" rx="18" fill="#fff" />
        {[0, 1, 2, 3, 4].map((k) => (
          <g key={k} opacity={k === 4 ? 1 : 0.55 + k * 0.1}>
            <rect x="24" y={40 + k * 36} width="432" height="28" rx="6" fill={ink} opacity={k === 4 ? 0.16 : 0.07} />
            <text x="38" y={59 + k * 36} fontSize="12" fill={ink} fontFamily="monospace">
              {`#${1041 + k}  ${["invoice", "payment", "invoice", "refund", "correction"][k]}`}
            </text>
            <text x="440" y={59 + k * 36} fontSize="12" fill={ink} fontFamily="monospace" textAnchor="end">
              {["+1,200", "-1,200", "+860", "-120", "+120"][k]}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "api") {
    return (
      <svg {...common} aria-label="API layer illustration">
        <rect x="0" y="20" width="480" height="240" rx="18" fill="#fff" />
        {["Web", "Mobile", "Admin"].map((c, k) => (
          <g key={c}>
            <rect x="24" y={48 + k * 62} width="104" height="44" rx="10" fill={ink} opacity="0.12" />
            <text x="76" y={75 + k * 62} fontSize="13" fill={ink} textAnchor="middle" fontFamily="sans-serif">
              {c}
            </text>
            <line x1="128" y1={70 + k * 62} x2="188" y2="132" stroke={ink} strokeWidth="2" opacity="0.4" />
          </g>
        ))}
        <rect x="188" y="92" width="120" height="80" rx="14" fill={ink} />
        <text x="248" y="128" fontSize="13" fill="#fff" textAnchor="middle" fontFamily="monospace">
          REST
        </text>
        <text x="248" y="148" fontSize="13" fill="#fff" textAnchor="middle" fontFamily="monospace">
          GraphQL
        </text>
        <line x1="308" y1="132" x2="356" y2="132" stroke={ink} strokeWidth="2" opacity="0.4" />
        <ellipse cx="408" cy="104" rx="44" ry="12" fill={ink} opacity="0.5" />
        <rect x="364" y="104" width="88" height="56" fill={ink} opacity="0.25" />
        <ellipse cx="408" cy="160" rx="44" ry="12" fill={ink} opacity="0.5" />
      </svg>
    );
  }

  if (kind === "deploy") {
    return (
      <svg {...common} aria-label="Reconnect and deployment illustration">
        <rect x="0" y="20" width="480" height="240" rx="18" fill="#fff" />
        <path d="M60 180 C 140 60, 340 60, 420 180" fill="none" stroke={ink} strokeWidth="3" strokeDasharray="8 8" opacity="0.5" />
        <circle cx="60" cy="180" r="22" fill={ink} opacity="0.2" />
        <circle cx="60" cy="180" r="9" fill={ink} />
        <circle cx="420" cy="180" r="22" fill={ink} opacity="0.2" />
        <circle cx="420" cy="180" r="9" fill={ink} />
        <rect x="190" y="70" width="100" height="34" rx="17" fill={ink} />
        <text x="240" y="92" fontSize="12" fill="#fff" textAnchor="middle" fontFamily="monospace">
          rejoin()
        </text>
      </svg>
    );
  }

  if (kind === "film") {
    return (
      <svg {...common} aria-label="Video encoding pipeline illustration">
        <rect x="0" y="20" width="480" height="240" rx="18" fill="#fff" />
        <rect x="24" y="44" width="200" height="120" rx="10" fill={ink} opacity="0.9" />
        <path d="M108 82 l40 22 -40 22z" fill="#fff" />
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x="256" y={52 + k * 40} width="200" height="28" rx="8" fill={ink} opacity={0.12} />
            <rect x="256" y={52 + k * 40} width={[180, 120, 70][k]} height="28" rx="8" fill={ink} opacity={0.55} />
            <text x="266" y={71 + k * 40} fontSize="12" fill="#fff" fontFamily="monospace">
              {["1080p", "720p", "480p"][k]}
            </text>
          </g>
        ))}
        <rect x="24" y="190" width="432" height="10" rx="5" fill={ink} opacity="0.12" />
        <rect x="24" y="190" width="260" height="10" rx="5" fill={ink} opacity="0.6" />
      </svg>
    );
  }

  if (kind === "stream") {
    const peers = [
      [70, 70],
      [70, 200],
      [410, 70],
      [410, 200],
    ];
    return (
      <svg {...common} aria-label="Real-time media server illustration">
        <rect x="0" y="20" width="480" height="240" rx="18" fill="#fff" />
        {peers.map(([x, y], k) => (
          <g key={k}>
            <line x1="240" y1="135" x2={x} y2={y} stroke={ink} strokeWidth="2" strokeDasharray="5 6" opacity="0.5" />
            <circle cx={x} cy={y} r="20" fill={ink} opacity="0.18" />
            <circle cx={x} cy={y} r="8" fill={ink} opacity="0.75" />
          </g>
        ))}
        <circle cx="240" cy="135" r="38" fill={ink} />
        <text x="240" y="140" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="monospace">
          SFU
        </text>
        <rect x="24" y="36" width="58" height="20" rx="10" fill="#e5484d" />
        <text x="53" y="50" textAnchor="middle" fontSize="11" fill="#fff" fontFamily="sans-serif">
          LIVE
        </text>
      </svg>
    );
  }

  return (
    <svg {...common} aria-label="E-commerce and accounting API illustration">
      <rect x="0" y="20" width="480" height="240" rx="18" fill="#fff" />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={24 + k * 148} y="44" width="136" height="110" rx="10" fill={ink} opacity={0.1 + k * 0.05} />
          <rect x={40 + k * 148} y="60" width="104" height="56" rx="6" fill={ink} opacity="0.35" />
          <rect x={40 + k * 148} y="126" width="60" height="10" rx="5" fill={ink} opacity="0.7" />
        </g>
      ))}
      {[0, 1].map((k) => (
        <g key={k}>
          <rect x="24" y={168 + k * 30} width="432" height="22" rx="6" fill={ink} opacity="0.08" />
          <text x="36" y={183 + k * 30} fontSize="12" fill={ink} fontFamily="monospace">
            {k === 0 ? "query { orders(status: PAID) { id total } }" : "POST /api/ledger/entries  201 Created"}
          </text>
        </g>
      ))}
    </svg>
  );
}
