type Props = {
  className?: string;
  tone?: "teal" | "deep" | "sand";
  label?: string;
};

const tones = {
  teal: ["#1F6F68", "#0E2A32"],
  deep: ["#12403C", "#0A1A20"],
  sand: ["#2D8C82", "#12403C"],
};

export default function UnderwaterPanel({
  className = "",
  tone = "teal",
  label,
}: Props) {
  const [from, to] = tones[tone];
  const uid = `${from}-${to}`.replace(/[^a-z0-9]/gi, "");

  return (
    <div className={className}>
      <div className="relative overflow-hidden w-full h-full">
        <svg
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          aria-hidden
        >
          <defs>
            <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
            <linearGradient id={`ray-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill={`url(#grad-${uid})`} />
          <polygon points="60,0 140,0 260,400 180,400" fill={`url(#ray-${uid})`} />
          <polygon points="180,0 240,0 320,400 260,400" fill={`url(#ray-${uid})`} opacity="0.6" />
          {[
            [70, 320, 6], [120, 250, 4], [300, 300, 5],
            [340, 180, 3], [90, 140, 4], [250, 90, 6],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="#ffffff" opacity="0.25" />
          ))}
        </svg>
        {label && (
          <span className="absolute bottom-3 left-3 font-gauge text-[10px] tracking-[0.15em] uppercase text-white/70">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
