import Link from "next/link";
import { SUBJECT_TAGS, LOCATION_TAGS } from "@/lib/tags";

export default function TagFilterLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {[...SUBJECT_TAGS, ...LOCATION_TAGS].map((tag) => (
        <Link
          key={tag.label}
          href={`/articles?tag=${encodeURIComponent(tag.label)}`}
          className="font-body text-sm font-medium px-4 py-2 rounded-full text-white shadow-sm opacity-90 hover:opacity-100 transition-opacity"
          style={{ backgroundColor: tag.color }}
        >
          {tag.label}
        </Link>
      ))}
    </div>
  );
}
