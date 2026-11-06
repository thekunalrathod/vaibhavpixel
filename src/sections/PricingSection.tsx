import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    name: 'Monthly',
    price: '$5,000',
    period: '/ per month',
    features: [
      'Unlimited Revisions & Requests',
      'One Senior Designer',
      'Daily Updates',
      'Managed via Slack & Notion',
    ],
    cta: 'Get Started Today',
    outlined: false,
  },
  {
    name: 'Sprints',
    price: '$10,000',
    period: '/ onwards',
    features: [
      'Clear pre-defined scope',
      'Fast turnaround',
      'Daily Updates',
      'Managed via Slack & Notion',
    ],
    cta: 'Book A Call',
    outlined: true,
  },
];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
    <circle cx="9" cy="9" r="9" fill="var(--color-surface-highlight)" />
    <path d="M5.5 9L7.5 11L12.5 6.5" stroke="var(--color-text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-card-item', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" id="pricing">
      <div className="container-main">
        <div className="mb-16">
          <span className="section-number block mb-6">(05)</span>
          <h2 className="text-display-l max-w-3xl">
            <span className="font-script" style={{ fontSize: '1.15em' }}>T</span>he pricing is transparent, just like our process.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
          {PLANS.map((plan) => (
            <div key={plan.name} className="pricing-card-item" style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              padding: 40,
              transition: 'all 0.3s ease',
            }}>
              <h3 className="font-script mb-2" style={{ fontSize: 32, color: 'var(--color-text-primary)' }}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, lineHeight: 1, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
                  {plan.price}
                </span>
                <span className="text-caption">{plan.period}</span>
              </div>

              {/* Features list — flexbox aligned */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3" style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full h-14 font-body text-sm font-medium transition-all duration-300 ${plan.outlined ? 'border hover:bg-white hover:text-black' : 'hover:opacity-80'}`}
                style={{
                  backgroundColor: plan.outlined ? 'transparent' : 'var(--color-surface-highlight)',
                  color: 'var(--color-text-primary)',
                  borderColor: plan.outlined ? 'var(--color-text-primary)' : 'transparent',
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
