"use client";

import { useEffect, useRef } from "react";

type YTPlayer = {
  playVideo: () => void;
};

type YTPlayerEvent = {
  data: number;
  target: YTPlayer;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        opts: {
          events: {
            onReady: (e: YTPlayerEvent) => void;
            onStateChange: (e: YTPlayerEvent) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { ENDED: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const VIDEO_ID = "iKWel-IRPko";

export default function HeroVideo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    function createPlayer() {
      if (!iframeRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: (e) => e.target.playVideo(),
          onStateChange: (e) => {
            const state = window.YT!.PlayerState;
            if (e.data === state.PAUSED || e.data === state.ENDED) {
              e.target.playVideo();
            }
          },
        },
      });
    }

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    function resumeOnForeground() {
      if (document.visibilityState === "visible") {
        playerRef.current?.playVideo();
      }
    }
    document.addEventListener("visibilitychange", resumeOnForeground);
    return () => document.removeEventListener("visibilitychange", resumeOnForeground);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&enablejsapi=1`}
      title="BamBam Diving background video"
      allow="autoplay; encrypted-media"
      frameBorder={0}
    />
  );
}
