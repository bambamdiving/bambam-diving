import MapView from "@/components/MapView";
import { type MapPin } from "@/components/WorldMap";
import TagFilterLinks from "@/components/TagFilterLinks";
import { getAllArticles } from "@/lib/articles";
import { findContributor } from "@/lib/contributors";
import { getPinOverrides } from "@/lib/mapPins";

export const metadata = {
  title: "Map | BamBam Diving",
  description: "Every dive site logged so far, in one place.",
};

const COUNTRY_COORDS: Record<string, { x: number; y: number }> = {
  Fiji: { x: 96, y: 75 },
  Mexico: { x: 18, y: 51 },
  "New Zealand": { x: 90.5, y: 88 },
  Indonesia: { x: 76, y: 67 },
  Dubai: { x: 56, y: 51 },
};

export default async function MapPage() {
  const articles = getAllArticles();
  const overrides = await getPinOverrides();

  const pins: MapPin[] = Object.entries(COUNTRY_COORDS)
    .map(([country, coords]) => {
      const matches = articles.filter((a) => a.location?.includes(country));
      return {
        country,
        ...(overrides[country] ?? coords),
        articles: matches.map((a) => {
          const contributor = findContributor(a.contributor);
          return {
            slug: a.slug,
            title: a.title,
            tags: a.tags ?? [],
            coverImage: a.coverImage,
            contributorName: contributor?.name,
            contributorPhoto: contributor?.photo,
          };
        }),
      };
    })
    .filter((pin) => pin.articles.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="font-gauge text-buoy text-xs tracking-[0.2em] uppercase mb-3">
        Where We&rsquo;ve Been
      </p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink mb-4">
        Map
      </h1>
      <p className="text-ink-dim max-w-xl mb-12">
        Glowing pins mark countries we&rsquo;ve got dive stories from &mdash; tap one to
        see the articles. Everywhere else is still uncharted.
      </p>

      <MapView pins={pins} tagCountries={pins.map((pin) => pin.country)} />

      <p className="text-ink-dim text-sm mt-4 mb-8 text-center">
        Pins are geo-located to the country, not the exact dive site.
      </p>

      <div className="flex justify-center">
        <TagFilterLinks />
      </div>
    </div>
  );
}
