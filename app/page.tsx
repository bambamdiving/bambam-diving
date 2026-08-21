import Link from "next/link";
import Image from "next/image";
import HeroVideo from "@/components/HeroVideo";

const pillLinks = [
  { href: "/articles", label: "Articles", color: "#FFD9B3" },
  { href: "/map", label: "Map", color: "#C7E3E5" },
  { href: "/gallery", label: "Gallery", color: "#CBCEE3" },
  { href: "/crew", label: "Us", color: "#BEE3E8" },
];

const carouselLogos = [
  { src: "/logos/ash-creative.png", alt: "ASH Creative", href: undefined, blend: true },
  { src: "/logos/legasea.png", alt: "LegaSea", href: "https://www.legasea.co.nz", blend: false },
  { src: "/logos/red-earth.png", alt: "Red Earth", href: "https://redearth.agency/", blend: false },
  { src: "/logos/divers-underground.jpg", alt: "Divers Underground", href: "https://www.diversunderground.com/", blend: true },
  { src: "/logos/deep-dive-dubai.png", alt: "Deep Dive Dubai", href: "https://www.deepdivedubai.com/", blend: false },
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
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 overflow-hidden">
          <HeroVideo />
          <div className="absolute inset-0 bg-navy/20" />
        </div>
        <div className="relative mx-auto flex min-h-[560px] sm:min-h-[680px] max-w-6xl flex-col justify-between px-5 sm:px-8 pt-24 pb-10 sm:pt-32 sm:pb-14 text-center">
          <div>
            <h1 className="font-display italic text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
              The World&rsquo;s Best
              <br />
              <span className="text-buoy">Dive Site</span>
            </h1>
            <p className="mt-4 font-body text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              *probably not the world&rsquo;s best dive site
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-5 pt-10">
            {pillLinks.map((pill) => (
              <Link
                key={pill.href}
                href={pill.href}
                className="font-display text-xl sm:text-2xl text-ink px-10 py-5 rounded-full transition-transform hover:scale-105"
                style={{ backgroundColor: pill.color }}
              >
                {pill.label}
              </Link>
            ))}
          </div>
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
