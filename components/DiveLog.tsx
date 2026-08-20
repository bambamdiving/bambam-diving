type DiveLogProps = {
  location: string;
  depth: string;
  diveTime: string;
  waterTemp: string;
  visibility: string;
};

function isEmpty(v: string) {
  return !v || v === "TBD" || v === "—";
}

export default function DiveLog({
  location,
  depth,
  diveTime,
  waterTemp,
  visibility,
}: DiveLogProps) {
  const fields = [
    { label: "DEPTH", value: depth },
    { label: "DIVE TIME", value: diveTime },
    { label: "WATER TEMP", value: waterTemp },
    { label: "VISIBILITY", value: visibility },
  ].filter((f) => !isEmpty(f.value));

  if (isEmpty(location) && fields.length === 0) return null;

  return (
    <div className="border border-line bg-panel rounded-lg px-5 py-4 flex flex-wrap gap-x-8 gap-y-3 items-center">
      <div className="flex items-center gap-2 text-buoy">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-buoy" />
        <span className="font-gauge text-[11px] tracking-[0.15em] uppercase">
          Dive Log
        </span>
      </div>
      {!isEmpty(location) && (
        <div className="flex flex-col">
          <span className="font-gauge text-[10px] tracking-[0.15em] text-ink-dim uppercase">
            Location
          </span>
          <span className="font-gauge text-sm text-ink">{location}</span>
        </div>
      )}
      {fields.map((f) => (
        <div key={f.label} className="flex flex-col">
          <span className="font-gauge text-[10px] tracking-[0.15em] text-ink-dim uppercase">
            {f.label}
          </span>
          <span className="font-gauge text-sm text-ink">{f.value}</span>
        </div>
      ))}
    </div>
  );
}
