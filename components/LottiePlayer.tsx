'use client';

import React, { CSSProperties } from 'react';
import { Lottie } from 'lottie-react';

interface LottiePlayerProps {
  /** Path relative to /public, e.g. "/lottie/web-coding.json" */
  src: string;
  loop?: boolean;
  autoplay?: boolean;
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
  render() {
    return this.state.crashed ? null : this.props.children;
  }
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({
  src,
  loop = true,
  autoplay = true,
  speed = 1,
  style,
  className,
  ariaLabel,
}) => {
  return (
    <LottieErrorBoundary>
      <div
        className={className}
        style={style}
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        role={ariaLabel ? 'img' : undefined}
      >
        <Lottie
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
