import { useRef, useEffect } from 'react';

const SOCIALS = [
  {
    name: 'Instagram', href: '#',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>),
  },
  {
    name: 'Dribbble', href: '#',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8.5 2.5c1.5 3 4 8 5.5 14" /><path d="M2.5 12.5c4 0 9-1 14-3.5" /><path d="M5 20.5c3-4.5 7.5-7 13.5-7.5" /></svg>),
  },
  {
    name: 'LinkedIn', href: '#',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>),
  },
  {
    name: 'X', href: '#',
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>),
  },
];

/* ─── Video Text Mask "2026" — mix-blend-mode: multiply ─── */
function GrandFinaleMask() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays (autoplay policy safeguard)
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {
        // Autoplay blocked — video will show poster frame, still works
      });
    }
  }, []);

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: '70vh', backgroundColor: '#000' }}
    >
      {/* Video layer — bottom */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ objectFit: 'cover', zIndex: 1 }}
      >
        <source src="/videos/glitch-loop.mp4" type="video/mp4" />
      </video>

      {/* Scanline overlay for CRT feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* Mask text layer — black bg + white text + mix-blend-mode: multiply */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 3,
          backgroundColor: '#000',
          color: '#fff',
          mixBlendMode: 'multiply',
        }}
      >
        <span
          className="font-display italic select-none"
          style={{
            fontSize: 'clamp(80px, 25vw, 400px)',
            fontWeight: 800,
            lineHeight: 0.85,
            letterSpacing: '-0.05em',
          }}
        >
          2026
        </span>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full" style={{ backgroundColor: '#050505' }}>
      {/* ─── Grand Finale: Video Text Mask ─── */}
      <GrandFinaleMask />

      {/* ─── Standard Footer ─── */}
      <div
        className="relative w-full"
        style={{
          zIndex: 10,
          backgroundColor: '#050505',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Main footer row */}
        <div className="container-main" style={{ paddingTop: 48, paddingBottom: 40 }}>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
            {/* Left: Sparkle */}
            <div className="flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-spin-slow">
                <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" fill="var(--color-text-primary)" opacity="0.7" />
              </svg>
            </div>

            {/* Center: Description */}
            <div className="text-center max-w-xs mx-auto">
              <p style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.01em' }}>
                A creative-first design service studio based out of Lucknow, India,
                Specialising in branding, web design &amp; marketing.
              </p>
            </div>

            {/* Right: Socials */}
            <div className="flex items-center gap-5 flex-shrink-0">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="transition-colors duration-300 hover:text-white"
                  style={{ color: 'var(--color-text-tertiary)' }}
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Legal row */}
          <div className="flex items-center justify-center gap-5 mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <a href="#" className="footer-link transition-colors duration-300 hover:text-white" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', position: 'relative' }}>
              Terms of Service
            </a>
            <span style={{ color: 'var(--color-text-tertiary)', fontSize: 11 }}>&#10005;</span>
            <a href="#" className="footer-link transition-colors duration-300 hover:text-white" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', position: 'relative' }}>
              Privacy Policy
            </a>
          </div>

          {/* PDF Book link */}
          <div className="text-center mt-6 mb-2">
            <a
              href="#"
              className="transition-colors duration-300 hover:text-white inline-block"
              style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            >
              <span className="underline underline-offset-4" style={{ textDecorationColor: 'rgba(255,255,255,0.15)' }}>
                VAIBHAVPIXEL<sup className="text-[0.65em]">&reg;</sup> &apos;The Book&apos; 2026.pdf
              </span>
            </a>
          </div>
        </div>

        {/* Copyright bar */}
        <div
          className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-mono" style={{ color: 'var(--color-text-tertiary)', fontSize: 11 }}>
            &copy; 2025 VaibhavPixel. All rights reserved.
          </span>
          <span className="text-mono" style={{ color: 'var(--color-text-tertiary)', fontSize: 11 }}>
            Crafting Pixels. Building Experiences.
          </span>
        </div>
      </div>

      {/* Awwwards badge */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden xl:flex flex-col items-center justify-center pointer-events-none"
        style={{ zIndex: 20, width: 40 }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-mono text-[10px] font-medium" style={{ color: 'var(--color-text-primary)', writingMode: 'vertical-rl' }}>W.</span>
          <span className="text-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--color-text-tertiary)', writingMode: 'vertical-rl' }}>Nominee</span>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 14s linear infinite; }
        .footer-link::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: -3px;
          left: 0;
          background-color: #fff;
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
        }
        .footer-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>
    </footer>
  );
}
