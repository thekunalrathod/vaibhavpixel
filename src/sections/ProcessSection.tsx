import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'Add your tasks to Notion',
    desc: 'You get your own Notion board. Add tasks, set priorities, and track live progress. Your team can add requests too. Everything stays organized in one place.',
    image: '/images/process-notion.jpg',
    reverse: false,
  },
  {
    num: '02',
    title: 'Relax or talk to us',
    desc: 'We collaborate on Slack. No scheduled calls, no long email threads. Just quick, async communication whenever you need us. We\'re a message away.',
    image: '/images/process-slack.jpg',
    reverse: true,
  },
  {
    num: '03',
    title: 'Wait for Results',
    desc: 'Designs land in Figma for you to review and comment. Revisions are unlimited. We iterate until it\'s right, before your deadline.',
    image: '/images/process-figma.jpg',
    reverse: false,
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-step',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" id="process">
      <div className="container-main">
        <div className="mb-20">
          <span className="section-number block mb-6">(02)</span>
          <h2 className="text-display-l max-w-2xl mb-6" style={{ lineHeight: 1.05 }}>
            <span className="font-script" style={{ fontSize: '1.1em' }}>T</span>he process that is unbreakable &amp; delivers every time
          </h2>
          <p className="text-body max-w-xl" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15 }}>
            Three steps. Notion for tasks, Slack for comms, Figma for delivery. No long email chains,
            no Zoom marathons, no guessing where things stand.
          </p>
        </div>

        <div className="relative">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className={`process-step grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 last:mb-0 ${
                step.reverse ? 'lg:direction-rtl' : ''
              }`}
            >
              <div className={step.reverse ? 'lg:order-2' : ''}>
                <span className="text-mono block mb-4">({step.num})</span>
                <h3 className="text-h2 mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  <span className="font-script" style={{ fontSize: '1.15em' }}>{step.title.charAt(0)}</span>
                  {step.title.slice(1)}
                </h3>
                <p className="text-body max-w-md">{step.desc}</p>
              </div>

              <div className={step.reverse ? 'lg:order-1' : ''}>
                <div
                  className="relative overflow-hidden group"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ aspectRatio: '16/10' }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
