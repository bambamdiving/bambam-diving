import Image from "next/image";
import HeroVideo from "@/components/HeroVideo";
import ArticleCard from "@/components/ArticleCard";
import TagFilterLinks from "@/components/TagFilterLinks";
import { getAllArticles } from "@/lib/articles";

const carouselLogos = [
  { src: "/logos/ash-creative.png", alt: "ASH Creative", href: undefined, blend: true },
  { src: "/logos/legasea.png", alt: "LegaSea", href: "https://www.legasea.co.nz", blend: false },
  { src: "/logos/red-earth.png", alt: "Red Earth", href: "https://redearth.agency/", blend: false },
  { src: "/logos/divers-underground.jpg", alt: "Divers Underground", href: "https://www.diversunderground.com/", blend: true },
];

const featuredSlugs = [
  "shark-diving-in-fiji-with-beqa-adventure-divers",
  "cenotes-cave-diving-in-mexico",
];

const socialButtons = [
  {
    href: "https://www.facebook.com/profile.php?id=61575993140919",
    label: "Facebook",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/BamBamDiving",
    label: "Instagram",
    color: "#C13584",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@BamBamDiving",
    label: "YouTube",
    color: "#DC2626",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
      </svg>
    ),
  },
];

export default function Home() {
  const articles = getAllArticles();
  const featuredArticles = featuredSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is (typeof articles)[number] => Boolean(a));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 overflow-hidden">
          <HeroVideo />
          <div className="absolute inset-0 bg-navy/20" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-24 pb-28 sm:pt-32 sm:pb-36 text-center">
          <h1 className="font-display italic text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
            The World&rsquo;s Best
            <br />
            <span className="text-buoy">Dive Site</span>
          </h1>
          <p className="mt-4 font-body text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            *probably not the world&rsquo;s best dive site
          </p>
        </div>
      </section>

      {/* Logo carousel */}
      <section className="border-t border-line bg-paper-dim py-5 overflow-hidden">
        <div className="flex w-max bg-paper-dim animate-marquee">
          {[...carouselLogos, ...carouselLogos].map((logo, i) =>
            logo.href ? (
              <a
                key={`${logo.alt}-${i}`}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-40 h-20 mx-10 shrink-0 hover:scale-105 transition-transform"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className={`object-contain ${logo.blend ? "mix-blend-multiply" : ""}`}
                />
              </a>
            ) : (
              <div
                key={`${logo.alt}-${i}`}
                className="relative w-40 h-20 mx-10 shrink-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className={`object-contain ${logo.blend ? "mix-blend-multiply" : ""}`}
                />
              </div>
            )
          )}
        </div>
      </section>

      {/* Featured articles */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
        <p className="font-gauge text-buoy text-xs tracking-[0.2em] uppercase mb-3 text-center">
          Fresh In
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mb-6 text-center">
          Featured Articles
        </h2>
        <div className="flex justify-center mb-8">
          <TagFilterLinks />
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {featuredArticles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </section>

      {/* Social buttons */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex flex-wrap justify-center gap-6">
          {socialButtons.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex items-center justify-center w-20 h-20 rounded-full text-white transition-transform hover:scale-110"
              style={{ backgroundColor: social.color }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
