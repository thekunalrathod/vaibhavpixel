import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete?.();
      },
    });

    // Star continuous rotation (starts immediately)
    gsap.to(starRef.current, {
      rotation: 360,
      duration: 8,
      ease: 'none',
      repeat: -1,
    });

    // Star pulse/glow animation
    gsap.to('.star-glow', {
      opacity: 0.6,
      scale: 1.1,
      duration: 1.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Hold on black with star for ~1.5s, then fade out overlay
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 1.8,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Ambient glow behind star */}
      <div
        className="star-glow absolute"
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          filter: 'blur(20px)',
          opacity: 0.4,
        }}
      />

      {/* Chrome metallic 4-pointed sparkle star */}
      <div ref={starRef} className="relative" style={{ width: 48, height: 48 }}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Chrome metallic gradient - light at center, dark at tips */}
            <radialGradient
              id="chromeGrad"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#c8c8c8" />
              <stop offset="50%" stopColor="#808080" />
              <stop offset="75%" stopColor="#404040" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </radialGradient>
            {/* Highlight gradient for the top-left sheen */}
            <linearGradient id="sheenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Main 4-pointed star */}
          <path
            d="M24 0L27 18L48 24L27 27L24 48L21 27L0 24L21 18L24 0Z"
            fill="url(#chromeGrad)"
          />

          {/* Subtle sheen overlay */}
          <path
            d="M24 0L27 18L48 24L27 27L24 48L21 27L0 24L21 18L24 0Z"
            fill="url(#sheenGrad)"
            opacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
}
