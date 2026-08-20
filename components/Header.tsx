import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/map", label: "Map" },
  { href: "/gallery", label: "Gallery" },
  { href: "/crew", label: "The Crew" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display font-semibold text-xl sm:text-2xl text-ink"
        >
          BamBam <span className="text-buoy italic">Diving</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm text-ink-dim">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-teal transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/become-a-contributor"
          className="shrink-0 font-body text-sm font-medium bg-buoy hover:bg-buoy-dim text-white px-4 py-2.5 rounded-full transition-colors"
        >
          Get Published
        </Link>
      </div>
      <nav className="md:hidden flex items-center gap-5 overflow-x-auto px-5 pb-3 font-body text-sm text-ink-dim">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-teal whitespace-nowrap">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
