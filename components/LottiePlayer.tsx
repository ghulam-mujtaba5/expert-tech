'use client';

import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Lottie, type LottieHandle } from 'lottie-react';

interface LottiePlayerProps {
  /** Path relative to /public or URL, e.g. "/lottie/web-coding.json", or animation JSON object */
  src: string | object;
  loop?: boolean;
  autoplay?: boolean;
  /** Pause when out of viewport to conserve resources. Default: true */
  pauseWhenHidden?: boolean;
  style?: CSSProperties;
  className?: string;
  ariaLabel?: string;
  speed?: number;
}

/** Catches any errors during Lottie rendering */
class LottieErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { crashed: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { crashed: false };
  }
  static getDerivedStateFromError() {
    return { crashed: true };
  }
  componentDidCatch(error: Error) {
    console.warn('[LottiePlayer] Caught rendering issue:', error.message);
  }
  render() {
    return this.state.crashed ? null : this.props.children;
  }
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({
  src,
  loop = true,
  autoplay = true,
  pauseWhenHidden = true,
  speed = 1,
  style,
  className,
  ariaLabel,
}) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieHandle>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pause when scrolled out of viewport
  useEffect(() => {
    if (!mounted || !pauseWhenHidden || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!lottieRef.current) return;
        if (entry.isIntersecting) {
          lottieRef.current.play();
        } else {
          lottieRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted, pauseWhenHidden]);

  if (!mounted) {
    return (
      <div
        className={className}
        style={style}
        aria-hidden="true"
      />
    );
  }

  return (
    <LottieErrorBoundary>
      <div
        ref={containerRef}
        className={className}
        style={style}
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        role={ariaLabel ? 'img' : undefined}
      >
        <Lottie
          lottieRef={lottieRef}
          src={src}
          loop={loop}
          autoplay={autoplay}
          speed={speed}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </LottieErrorBoundary>
  );
};

export default LottiePlayer;
