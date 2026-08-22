"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", color: "#FFC9DD" },
  { href: "/articles", label: "Articles", color: "#FFD9B3" },
  { href: "/map", label: "Map", color: "#C7E3E5" },
  { href: "/gallery", label: "Gallery", color: "#CBCEE3" },
  { href: "/crew", label: "Us", color: "#BEE3E8" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61575993140919",
    label: "Facebook",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/BamBamDiving",
    label: "Instagram",
    color: "#C13584",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
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
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
      </svg>
    ),
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-navy border-b-4 border-buoy">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="BamBam Diving"
            width={280}
            height={112}
            className="h-12 sm:h-14 w-auto brightness-0 invert"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-2 font-body text-base text-navy-dim">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            const className = link.color
              ? `px-4 py-1.5 rounded-full font-medium text-ink transition-transform hover:scale-105 ${
                  active ? "ring-2 ring-white" : ""
                }`
              : `px-4 py-1.5 rounded-full transition-colors ${
                  active ? "bg-buoy text-white" : "hover:text-buoy"
                }`;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={className}
                style={link.color ? { backgroundColor: link.color } : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex items-center justify-center w-8 h-8 rounded-full text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: social.color }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <nav className="md:hidden flex items-center justify-between gap-1 px-2 pb-3 font-body text-[14.52px] text-navy-dim border-t border-white/10 pt-3">
        {navLinks.map((link) => {
          const active = pathname === link.href;
          const className = link.color
            ? `px-[10.56px] py-[5.28px] rounded-full whitespace-nowrap font-medium text-ink ${
                active ? "ring-2 ring-white" : ""
              }`
            : `px-[10.56px] py-[5.28px] rounded-full whitespace-nowrap transition-colors ${
                active ? "bg-buoy text-white" : "hover:text-buoy"
              }`;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={className}
              style={link.color ? { backgroundColor: link.color } : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
