"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Member = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  instagram?: string;
  website?: string;
  articlesHref?: string;
};

const avatarTones = ["#2F6778", "#191D32", "#2FA7AD", "#15687A"];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.75 5.5 3.75 9s-1.25 6.5-3.75 9c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3Z" />
    </svg>
  );
}

function ArticlesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M6 3h9l4 4v14H6z" strokeLinejoin="round" />
      <path d="M15 3v4h4M9 12h6M9 16h6" strokeLinecap="round" />
    </svg>
  );
}

export default function CrewGrid({ crew }: { crew: Member[] }) {
  const [active, setActive] = useState<number | null>(null);
  const selected = active !== null ? crew[active] : null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {crew.map((member, i) => (
          <button
            key={member.name}
            onClick={() => setActive(i)}
            className="flex flex-col items-center gap-3 group"
          >
            <span
              className="relative flex items-center justify-center w-24 h-24 rounded-full text-white font-display text-2xl overflow-hidden group-hover:scale-105 transition-transform"
              style={{ backgroundColor: avatarTones[i % avatarTones.length] }}
            >
              {member.photo ? (
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              ) : (
                initials(member.name)
              )}
            </span>
            <span className="font-body text-sm font-medium text-ink group-hover:text-buoy transition-colors text-center">
              {member.name}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 px-5"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-4 right-4 text-ink-dim hover:text-buoy transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
            <span
              className="relative flex items-center justify-center w-16 h-16 rounded-full text-white font-display text-xl mb-4 overflow-hidden"
              style={{ backgroundColor: avatarTones[active! % avatarTones.length] }}
            >
              {selected.photo ? (
                <Image src={selected.photo} alt={selected.name} fill className="object-cover" />
              ) : (
                initials(selected.name)
              )}
            </span>
            <h3 className="font-display text-2xl text-ink">{selected.name}</h3>
            {selected.role && (
              <p className="font-gauge text-[11px] tracking-[0.15em] uppercase text-buoy mt-1 mb-4">
                {selected.role}
              </p>
            )}
            <p className="text-ink-dim leading-relaxed">{selected.bio}</p>

            {(selected.instagram || selected.website || selected.articlesHref) && (
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-line">
                {selected.instagram && (
                  <a
                    href={selected.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${selected.name} on Instagram`}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink-dim hover:text-buoy hover:border-buoy transition-colors"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {selected.website && (
                  <a
                    href={selected.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${selected.name}'s website`}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink-dim hover:text-buoy hover:border-buoy transition-colors"
                  >
                    <WebsiteIcon />
                  </a>
                )}
                {selected.articlesHref && (
                  <Link
                    href={selected.articlesHref}
                    aria-label={`Articles by ${selected.name}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink-dim hover:text-buoy hover:border-buoy transition-colors"
                  >
                    <ArticlesIcon />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
