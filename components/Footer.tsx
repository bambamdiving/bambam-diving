import Image from "next/image";
import Link from "next/link";

export default function Footer({ authed = false }: { authed?: boolean }) {
  return (
    <footer className="bg-navy-deep mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <Image
            src="/logo.png"
            alt="BamBam Diving"
            width={280}
            height={112}
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="font-body text-sm text-navy-dim mt-2">
            &copy; {new Date().getFullYear()} BamBam Diving. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-6 font-body text-sm text-navy-dim">
          <a href="https://www.facebook.com/profile.php?id=61575993140919" className="hover:text-buoy">Facebook</a>
          <a href="https://www.instagram.com/BamBamDiving" className="hover:text-buoy">Instagram</a>
          <a href="https://www.youtube.com/@BamBamDiving" className="hover:text-buoy">YouTube</a>
          <Link
            href="/reports"
            aria-label={authed ? "Reports (unlocked)" : "Reports (locked)"}
            className={`hidden sm:inline-flex transition-opacity hover:opacity-80 ${
              authed ? "text-green-500" : "text-red-500"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M7 10V7a5 5 0 0 1 10 0v3" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
