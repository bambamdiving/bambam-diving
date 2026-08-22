"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    function resumeOnForeground() {
      if (document.visibilityState === "visible") {
        videoRef.current?.play().catch(() => {});
      }
    }
    document.addEventListener("visibilitychange", resumeOnForeground);
    return () => document.removeEventListener("visibilitychange", resumeOnForeground);
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      src="/videos/hero-loop.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
