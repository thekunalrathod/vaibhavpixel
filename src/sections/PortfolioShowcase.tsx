import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { title: 'Straydog Brand', category: 'Brand Identity', year: '2024', image: '/images/hero-project-1.jpg' },
  { title: 'Bitvvo Fintech', category: 'Web Design', year: '2024', image: '/images/hero-project-2.jpg' },
  { title: 'Solxar Systems', category: 'Brand Design', year: '2023', image: '/images/hero-project-3.jpg' },
  { title: 'Driftwell Wellness', category: 'Product Design', year: '2024', image: '/images/hero-project-4.jpg' },
  { title: 'Muscle Fitness', category: 'Motion Design', year: '2023', image: '/images/hero-project-5.jpg' },
  { title: 'PACEC Digital', category: 'UI/UX Design', year: '2024', image: '/images/hero-project-6.jpg' },
];

export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" id="works">
      <div className="container-main">
        <h2 className="text-h1 mb-16" style={{ color: 'var(--color-text-primary)' }}>
          <span className="font-script" style={{ fontSize: '1.2em' }}>S</span>elected Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <div key={project.title} className="portfolio-card group cursor-pointer">
              <div className="relative overflow-hidden mb-4" style={{ border: '1px solid var(--color-border)' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ aspectRatio: '16/10' }}
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-h3 transition-all duration-300 group-hover:underline" style={{ color: 'var(--color-text-primary)', textDecorationColor: 'var(--color-text-tertiary)' }}>
                    {project.title}
                  </h3>
                  <span className="text-mono mt-1 block">{project.category}</span>
                </div>
                <span className="text-mono flex-shrink-0">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
