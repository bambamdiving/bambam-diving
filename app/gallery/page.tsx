import Image from "next/image";
import photos from "@/content/gallery/photos.json";
import UnderwaterPanel from "@/components/UnderwaterPanel";

export const metadata = {
  title: "Gallery | BamBam Diving",
  description: "Shots from the last few dives, curated by hand.",
};

type Photo = {
  id: string;
  caption: string;
  location: string;
  imageUrl: string;
};

const tones: Array<"teal" | "deep" | "sand"> = ["teal", "deep", "sand"];

export default function GalleryPage() {
  const items = photos as Photo[];

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="font-gauge text-buoy text-xs tracking-[0.2em] uppercase mb-3">
        Curated, Not Scraped
      </p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink mb-4">
        Gallery
      </h1>
      <p className="text-ink-dim max-w-xl mb-12">
        A hand-picked log of shots from recent dives. No third-party feed to break &mdash;
        just tell me which photos to add and I&rsquo;ll drop them in here.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((photo, i) => (
          <figure
            key={photo.id}
            className="border border-line rounded-xl overflow-hidden bg-white shadow-sm"
          >
            <div className="relative aspect-square">
              {photo.imageUrl ? (
                <Image
                  src={photo.imageUrl}
                  alt={photo.caption}
                  fill
                  className="object-cover"
                />
              ) : (
                <UnderwaterPanel
                  className="h-full w-full"
                  tone={tones[i % tones.length]}
                  label="Photo pending"
                />
              )}
            </div>
            <figcaption className="p-4">
              <p className="font-gauge text-[10px] tracking-[0.15em] uppercase text-buoy mb-1">
                {photo.location}
              </p>
              <p className="text-ink-dim text-sm leading-relaxed">
                {photo.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
