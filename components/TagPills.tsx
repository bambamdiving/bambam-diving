import { ALL_TAGS } from "@/lib/tags";

const FALLBACK_COLOR = "#2F6778";

export default function TagPills({
  tags,
  size = "sm",
}: {
  tags?: string[];
  size?: "sm" | "md";
}) {
  if (!tags || tags.length === 0) return null;

  const sizeClasses =
    size === "md" ? "text-sm px-4 py-2" : "text-[11px] px-2.5 py-1";

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const color = ALL_TAGS.find((t) => t.label === tag)?.color ?? FALLBACK_COLOR;
        return (
          <span
            key={tag}
            className={`font-body font-medium text-white rounded-full ${sizeClasses}`}
            style={{ backgroundColor: color }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
