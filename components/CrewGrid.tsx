"use client";

import { useState } from "react";

type Member = {
  name: string;
  role: string;
  bio: string;
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
              className="flex items-center justify-center w-24 h-24 rounded-full text-white font-display text-2xl group-hover:scale-105 transition-transform"
              style={{ backgroundColor: avatarTones[i % avatarTones.length] }}
            >
              {initials(member.name)}
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
              className="flex items-center justify-center w-16 h-16 rounded-full text-white font-display text-xl mb-4"
              style={{ backgroundColor: avatarTones[active! % avatarTones.length] }}
            >
              {initials(selected.name)}
            </span>
            <h3 className="font-display text-2xl text-ink">{selected.name}</h3>
            {selected.role && (
              <p className="font-gauge text-[11px] tracking-[0.15em] uppercase text-buoy mt-1 mb-4">
                {selected.role}
              </p>
            )}
            <p className="text-ink-dim leading-relaxed">{selected.bio}</p>
          </div>
        </div>
      )}
    </>
  );
}
