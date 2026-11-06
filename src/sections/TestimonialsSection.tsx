import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "VaibhavPixel transformed our entire brand presence. The speed and quality of work was unlike anything we'd experienced with freelancers before. They truly became an extension of our team.",
    name: 'Sarah Mitchell', title: 'Founder & CEO', company: 'Straydog Foods', bg: '/images/testimonial-bg-1.jpg',
  },
  {
    quote: "From our initial landing page to a full product redesign, VaibhavPixel delivered consistently. The async workflow through Slack and Notion meant zero friction, even across time zones.",
    name: 'Marcus Chen', title: 'Head of Product', company: 'Bitvvo', bg: '/images/testimonial-bg-2.jpg',
  },
  {
    quote: "We went through three agencies before finding VaibhavPixel. The difference was immediate — better design, faster turnaround, and no micromanaging needed. Game changer for our startup.",
    name: 'Alexandra Reed', title: 'Co-founder', company: 'Driftwell', bg: '/images/hero-project-4.jpg',
  },
  {
    quote: "The subscription model is brilliant. We get senior-level design work without the overhead of a full-time hire. Our conversion rates improved 40% after the redesign.",
    name: 'James Park', title: 'VP Marketing', company: 'NOMAD LANE', bg: '/images/hero-project-7.jpg',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-card-item', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" id="testimonials">
      <div className="container-main">
        <div className="mb-16">
          <span className="section-number block mb-6">(04)</span>
          <h2 className="text-display-l max-w-3xl">
            <span className="font-script" style={{ fontSize: '1.15em' }}>F</span>rom the mouth of our beloved partners &amp; winners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card-item testimonial-card overflow-hidden">
              {/* Video-style background with slow zoom animation */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={t.bg}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{
                    animation: 'kenburns 20s ease-in-out infinite alternate',
                    transform: 'scale(1.1)',
                  }}
                  loading="lazy"
                />
                {/* Video overlay tint */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-surface) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.2) 100%)' }} />
                {/* Play button hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><polygon points="4,2 14,8 4,14" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-6" style={{ color: 'var(--color-text-primary)', fontSize: 15, lineHeight: 1.6 }}>
                  <span className="font-display italic text-xl mr-1" style={{ color: 'var(--color-text-tertiary)' }}>&ldquo;</span>
                  {t.quote}
                  <span className="font-display italic text-xl ml-1" style={{ color: 'var(--color-text-tertiary)' }}>&rdquo;</span>
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-body font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{t.name}</p>
                    <p className="text-caption">{t.title}, {t.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.1) translate(0, 0); }
          100% { transform: scale(1.25) translate(-2%, -1%); }
        }
      `}</style>
    </section>
  );
}
