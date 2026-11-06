import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* 3D Metallic shapes using CSS transforms and gradients */
function MetallicShapes() {
  return (
    <div className="relative w-full h-72 flex items-center justify-center" style={{ perspective: '600px' }}>
      {/* Rounded cube */}
      <div
        className="absolute"
        style={{
          width: 70,
          height: 70,
          borderRadius: 16,
          background: 'linear-gradient(135deg, #e0e0e0 0%, #888 50%, #444 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)',
          transform: 'translateX(-80px) translateY(-20px) rotateX(15deg) rotateY(-20deg)',
          animation: 'shapeFloat1 7s ease-in-out infinite',
        }}
      />
      {/* Sphere */}
      <div
        className="absolute"
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #fff 0%, #bbb 30%, #666 70%, #333 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset -8px -8px 20px rgba(0,0,0,0.3)',
          transform: 'translateX(50px) translateY(10px)',
          animation: 'shapeFloat2 6s ease-in-out infinite',
        }}
      />
      {/* Twisted torus ring */}
      <div
        className="absolute"
        style={{
          width: 90,
          height: 50,
          borderRadius: '50%',
          border: '14px solid transparent',
          background: 'linear-gradient(135deg, #ddd 0%, #777 50%, #333 100%) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          transform: 'translateX(0px) translateY(-50px) rotateX(60deg) rotateZ(15deg)',
          animation: 'shapeFloat3 8s ease-in-out infinite',
        }}
      />
      {/* Small accent dot */}
      <div
        className="absolute w-3 h-3 rounded-full"
        style={{
          background: 'radial-gradient(circle, #fff 0%, #999 100%)',
          transform: 'translateX(100px) translateY(-60px)',
          animation: 'shapeFloat4 5s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes shapeFloat1 { 0%,100%{transform:translateX(-80px) translateY(-20px) rotateX(15deg) rotateY(-20deg)} 50%{transform:translateX(-80px) translateY(-35px) rotateX(10deg) rotateY(-25deg)} }
        @keyframes shapeFloat2 { 0%,100%{transform:translateX(50px) translateY(10px)} 50%{transform:translateX(55px) translateY(-10px)} }
        @keyframes shapeFloat3 { 0%,100%{transform:translateX(0px) translateY(-50px) rotateX(60deg) rotateZ(15deg)} 50%{transform:translateX(5px) translateY(-60px) rotateX(55deg) rotateZ(20deg)} }
        @keyframes shapeFloat4 { 0%,100%{transform:translateX(100px) translateY(-60px)} 50%{transform:translateX(105px) translateY(-70px)} }
      `}</style>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-text', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.fromTo('.about-shapes', { opacity: 0, scale: 0.85 }, {
        opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" id="about">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <span className="about-text section-number block mb-6">(01)</span>
            <h2 className="about-text text-display-l mb-8">
              <span className="font-script" style={{ fontSize: '1.1em' }}>N</span>ot just another design team. The one you stop searching after.
            </h2>
            <p className="about-text text-body max-w-md" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.6 }}>
              Over 12 years grinding alongside founders &amp; agencies with a chip on their shoulder
              and a story that needs telling. VaibhavPixel is the design partner teams turn to when
              speed &amp; quality matter most.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center about-shapes">
            <MetallicShapes />
            <a
              href="#pricing"
              className="about-text cta-underline font-body text-sm font-medium flex items-center gap-2 mt-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Book A Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="var(--color-text-primary)" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
