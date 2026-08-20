import GalleryGrid, { type GalleryItem } from "@/components/GalleryGrid";
import photos from "@/content/gallery/photos.json";

export const metadata = {
  title: "Gallery | BamBam Diving",
  description: "Shots from the last few dives, curated by hand.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <GalleryGrid items={photos as GalleryItem[]} />
    </div>
  );
}
