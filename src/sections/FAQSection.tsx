import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: 'Why $5,000 a month?',
    a: "$5,000 per month is a strong value for the level of quality and support you receive. While some agencies may charge less, many rely on templates, recycled designs, or overloaded solo designers. With VAIBHAVPIXEL, you get dedicated creative support tailored to your brand and goals. That means better quality, more consistency, and work built specifically for your business. When you compare the value properly, $5,000 is a smart investment.",
  },
  {
    q: 'Just what does "unlimited" mean?',
    a: "There is no fixed cap on the amount of creative work you can request during the plan, and no separate charges for individual tasks within the agreed scope. The engagement is designed to give you flexible, high-value creative support throughout. Final output may vary depending on the nature, complexity, and pace of the work.",
  },
  {
    q: 'What programs you design in?',
    a: "All of our designers are skilled with Adobe Illustrator, XD, Photoshop, After Effects & Figma.",
  },
  {
    q: 'What if I don\'t like the designs?',
    a: "Our dedicated designer will revise the design until you are completely satisfied.",
  },
  {
    q: 'How quickly will I receive designs?',
    a: "Our designers work quickly and can respond to design requests within 2 hours; however, the time can take up to 3-4 business days depending on the complexity of the design request.",
  },
  {
    q: 'Is there a request limit?',
    a: "As much as you possibly can. There's no upper limit or any cap of any kind of any of our plans, which makes us truly unlimited design service.",
  },
  {
    q: 'Are there any refunds?',
    a: "We don't offer refunds due to the nature of our service, but in exceptional circumstances, we may offer a full refund.",
  },
];

/* 4-pointed sparkle star icon — matches CreativeCue exactly */
function SparkleIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0 transition-transform duration-500"
      style={{ transform: active ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path
        d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
        fill={active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)'}
        style={{ transition: 'fill 0.3s ease' }}
      />
    </svg>
  );
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleItem = (i: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-left', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.fromTo('.faq-item', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" id="faq">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT COLUMN — Photo collage + text */}
          <div className="faq-left">
            {/* Section number */}
            <span className="section-number block mb-4" style={{ fontSize: 'clamp(48px, 6vw, 72px)' }}>
              <span className="font-script" style={{ fontSize: '1.1em' }}>(06)</span>
            </span>

            {/* Title */}
            <h2 className="text-display-l mb-10" style={{ lineHeight: 1.05 }}>
              <span className="font-script block" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>Frequently Asked</span>
              <span className="font-body block font-normal" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.02em' }}>Questions</span>
            </h2>

            {/* Photo collage — 2 overlapping images */}
            <div className="relative mb-10" style={{ width: 320, height: 280 }}>
              {/* Bottom image (laptop/work) */}
              <div
                className="absolute"
                style={{
                  right: 20,
                  bottom: 0,
                  width: 220,
                  height: 200,
                  transform: 'rotate(8deg)',
                  zIndex: 1,
                }}
              >
                <img
                  src="/images/process-figma.jpg"
                  alt="Design work"
                  className="w-full h-full object-cover"
                  style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
                  loading="lazy"
                />
              </div>
              {/* Top image (burger/brand) */}
              <div
                className="absolute"
                style={{
                  left: 0,
                  top: 0,
                  width: 200,
                  height: 220,
                  transform: 'rotate(-6deg)',
                  zIndex: 2,
                }}
              >
                <img
                  src="/images/hero-project-1.jpg"
                  alt="Creative work"
                  className="w-full h-full object-cover"
                  style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Description text */}
            <p className="text-body mb-8 max-w-xs" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>
              Find clear answers to the most common questions, all in one place.
              Everything is explained simply and upfront, so you know exactly what to expect.
            </p>

            {/* CTA */}
            <a
              href="#pricing"
              className="cta-underline font-body text-sm font-medium"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Book A Call
            </a>
          </div>

          {/* RIGHT COLUMN — FAQ Accordion with dark cards */}
          <div className="space-y-0">
            {FAQS.map((faq, i) => {
              const isOpen = openItems.has(i);
              return (
                <div
                  key={i}
                  className="faq-item"
                  style={{
                    background: isOpen ? 'rgba(15,15,15,0.8)' : 'transparent',
                    border: '1px solid var(--color-border)',
                    borderBottom: i === FAQS.length - 1 ? '1px solid var(--color-border)' : 'none',
                    marginBottom: -1,
                    transition: 'background 0.4s ease',
                  }}
                >
                  {/* Question row */}
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                    onClick={() => toggleItem(i)}
                  >
                    <h3
                      className="font-body font-normal pr-4"
                      style={{
                        fontSize: 16,
                        color: isOpen ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        letterSpacing: '-0.01em',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {faq.q}
                    </h3>
                    <SparkleIcon active={isOpen} />
                  </button>

                  {/* Answer */}
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: isOpen ? 400 : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p
                      className="px-6 pb-5 font-body"
                      style={{
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: '50ch',
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
