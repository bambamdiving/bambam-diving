export default function Footer() {
  return (
    <footer className="bg-navy-deep mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg text-white">
            BamBam <span className="text-buoy italic">Diving</span>
          </p>
          <p className="font-body text-sm text-navy-dim mt-2">
            &copy; {new Date().getFullYear()} BamBam Diving. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-6 font-body text-sm text-navy-dim">
          <a href="https://www.facebook.com/profile.php?id=61575993140919" className="hover:text-buoy">Facebook</a>
          <a href="https://www.instagram.com/BamBamDiving" className="hover:text-buoy">Instagram</a>
          <a href="https://www.youtube.com/@BamBamDiving" className="hover:text-buoy">YouTube</a>
        </div>
      </div>
    </footer>
  );
}
