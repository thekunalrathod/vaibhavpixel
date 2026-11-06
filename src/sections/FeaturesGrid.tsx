import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { num: '01', title: 'The Best', desc: 'Every designer on our team is handpicked and vetted with 5+ years of experience.', icon: 'star' },
  { num: '02', title: 'No Micromanaging', desc: 'We manage everything from designers to tasks and deadlines. All done for you.', icon: 'diamond' },
  { num: '03', title: 'Lightning Fast', desc: 'Our designers respond and begin tasks within 4 hours from creation & assignment.', icon: 'orb' },
  { num: '04', title: 'Unique & all yours', desc: 'Our work is always 100% original. We never use templates or recycle designs.', icon: 'ring' },
  { num: '05', title: 'Elites only', desc: 'All designers are industry experts with 5+ years of experience under their belt.', icon: 'cube' },
  { num: '06', title: 'Reliable by default', desc: 'No chasing, no disappearing acts, no missed deadlines. Just dependable support.', icon: 'shield' },
  { num: '07', title: 'Flexible for you', desc: 'Pause or cancel anytime. No long-term commitments, direct control.', icon: 'arrows' },
  { num: '08', title: 'Scaleable & dynamic', desc: 'Additional designers ready to plug into your team quickly.', icon: 'network' },
];

/* Metallic 3D-style SVG icons — chrome/silver aesthetic */
function MetallicIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    star: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs><linearGradient id="mg1" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor="#e8e8e8"/><stop offset="50%" stopColor="#999"/><stop offset="100%" stopColor="#555"/></linearGradient></defs>
        <path d="M24 4L28 20L44 24L28 28L24 44L20 28L4 24L20 20L24 4Z" stroke="url(#mg1)" strokeWidth="1.5" fill="none"/><circle cx="24" cy="24" r="3" fill="#aaa"/>
      </svg>
    ),
    diamond: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs><linearGradient id="mg2" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor="#e0e0e0"/><stop offset="100%" stopColor="#666"/></linearGradient></defs>
        <rect x="12" y="12" width="24" height="24" rx="4" transform="rotate(45 24 24)" stroke="url(#mg2)" strokeWidth="1.5" fill="none"/>
        <rect x="20" y="20" width="8" height="8" rx="2" transform="rotate(45 24 24)" fill="#888" opacity="0.4"/>
      </svg>
    ),
    orb: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs><radialGradient id="mg3" cx="35%" cy="30%"><stop offset="0%" stopColor="#fff" stopOpacity="0.8"/><stop offset="60%" stopColor="#888" stopOpacity="0.3"/><stop offset="100%" stopColor="#444" stopOpacity="0.1"/></radialGradient></defs>
        <circle cx="24" cy="24" r="18" stroke="#777" strokeWidth="1.5" fill="none"/><circle cx="24" cy="24" r="18" fill="url(#mg3)"/><circle cx="18" cy="18" r="4" fill="#fff" opacity="0.3"/>
      </svg>
    ),
    ring: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs><linearGradient id="mg4" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor="#ddd"/><stop offset="100%" stopColor="#555"/></linearGradient></defs>
        <circle cx="24" cy="24" r="16" stroke="url(#mg4)" strokeWidth="2.5" fill="none"/><circle cx="24" cy="24" r="8" stroke="#777" strokeWidth="1" fill="none"/>
      </svg>
    ),
    cube: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs><linearGradient id="mg5" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor="#e4e4e4"/><stop offset="100%" stopColor="#666"/></linearGradient></defs>
        <rect x="10" y="10" width="28" height="28" rx="6" stroke="url(#mg5)" strokeWidth="1.5" fill="none"/><rect x="16" y="16" width="16" height="16" rx="3" stroke="#888" strokeWidth="1" fill="none"/>
      </svg>
    ),
    shield: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs><linearGradient id="mg6" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor="#ccc"/><stop offset="100%" stopColor="#555"/></linearGradient></defs>
        <path d="M24 6L40 14V24C40 34 32.5 40.5 24 44C15.5 40.5 8 34 8 24V14L24 6Z" stroke="url(#mg6)" strokeWidth="1.5" fill="none"/><circle cx="24" cy="24" r="6" stroke="#999" strokeWidth="1" fill="none"/>
      </svg>
    ),
    arrows: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs><linearGradient id="mg7" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor="#ccc"/><stop offset="100%" stopColor="#555"/></linearGradient></defs>
        <path d="M16 10V38M32 10V38M10 18L16 10L22 18M26 30L32 38L38 30" stroke="url(#mg7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    network: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs><linearGradient id="mg8" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor="#ccc"/><stop offset="100%" stopColor="#555"/></linearGradient></defs>
        <circle cx="14" cy="14" r="5" stroke="url(#mg8)" strokeWidth="1.5" fill="none"/><circle cx="34" cy="14" r="5" stroke="url(#mg8)" strokeWidth="1.5" fill="none"/>
        <circle cx="14" cy="34" r="5" stroke="url(#mg8)" strokeWidth="1.5" fill="none"/><circle cx="34" cy="34" r="5" stroke="url(#mg8)" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="24" r="6" stroke="#999" strokeWidth="1.5" fill="none"/>
        <path d="M18 18L22 22M30 18L26 22M18 30L22 26M30 30L26 26" stroke="#777" strokeWidth="1"/>
      </svg>
    ),
  };

  return <div style={{ width: 48, height: 48 }}>{icons[type] || null}</div>;
}

export default function FeaturesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card-item', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" id="features">
      <div className="container-main">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div key={f.num} className="feature-card-item feature-card" style={{ padding: '32px 24px' }}>
              {/* Icon — 48x48 fixed, mb-24px */}
              <div className="mb-6"><MetallicIcon type={f.icon} /></div>
              {/* Number */}
              <span className="text-mono block mb-3">({f.num})</span>
              {/* Title — script first letter */}
              <h3 className="mb-3" style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.3px', lineHeight: 1.2, color: 'var(--color-text-primary)' }}>
                <span className="font-script" style={{ fontSize: '1.15em' }}>{f.title.charAt(0)}</span>
                {f.title.slice(1)}
              </h3>
              {/* Desc — 14px, breathing room */}
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--color-text-secondary)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
