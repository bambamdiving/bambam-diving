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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.75 5.5 3.75 9s-1.25 6.5-3.75 9c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3Z" />
    </svg>
  );
}

function ArticlesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M6 3h9l4 4v14H6z" strokeLinejoin="round" />
      <path d="M15 3v4h4M9 12h6M9 16h6" strokeLinecap="round" />
    </svg>
  );
}

export default function CrewGrid({ crew }: { crew: Member[] }) {
  const [active, setActive] = useState<number | null>(null);
  const selected = active !== null ? crew[active] : null;
  const selectedTone = active !== null ? avatarTones[active % avatarTones.length] : undefined;

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
              className="relative flex items-center justify-center w-[115px] h-[115px] md:w-[150px] md:h-[150px] rounded-full text-white font-display text-2xl overflow-hidden group-hover:scale-105 transition-transform"
              style={{ backgroundColor: avatarTones[i % avatarTones.length] }}
            >
              {member.photo ? (
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              ) : (
                initials(member.name)
              )}
            </span>
            <span className="font-body text-sm font-medium md:text-lg md:font-bold text-ink group-hover:text-buoy transition-colors text-center">
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
            className="relative rounded-xl overflow-hidden max-w-md w-full min-h-[520px] flex flex-col justify-end"
            style={{ backgroundColor: selectedTone }}
            onClick={(e) => e.stopPropagation()}
          >
            {selected.photo && (
              <Image src={selected.photo} alt={selected.name} fill className="object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/10" />

            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/15 backdrop-blur text-white hover:bg-white/25 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative p-8">
              <h3 className="font-display text-3xl text-white">{selected.name}</h3>
              {selected.role && (
                <p className="font-gauge text-[11px] tracking-[0.15em] uppercase text-buoy mt-1 mb-4">
                  {selected.role}
                </p>
              )}
              <p className="text-white/90 leading-relaxed">{selected.bio}</p>

              {(selected.instagram || selected.website || selected.articlesHref) && (
                <div className="flex items-center gap-3 mt-6">
                  {selected.instagram && (
                    <a
                      href={selected.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${selected.name} on Instagram`}
                      className="flex items-center justify-center w-14 h-14 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white hover:bg-white/25 transition-colors"
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
                      className="flex items-center justify-center w-14 h-14 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white hover:bg-white/25 transition-colors"
                    >
                      <WebsiteIcon />
                    </a>
                  )}
                  {selected.articlesHref && (
                    <Link
                      href={selected.articlesHref}
                      aria-label={`Articles by ${selected.name}`}
                      className="flex items-center justify-center w-14 h-14 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white hover:bg-white/25 transition-colors"
                    >
                      <ArticlesIcon />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
