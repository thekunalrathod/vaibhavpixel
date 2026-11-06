import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    num: '01',
    code: '1',
    name: 'Brand',
    items: [
      'Creative Strategy & Art Direction',
      'Identity',
      'Campaigns',
      'Guidelines',
      'Packaging',
      'Digital',
      'Illustration',
      'Typography',
    ],
  },
  {
    num: '02',
    code: '2',
    name: 'Digital',
    items: [
      'Web Design',
      'Web Development',
      'Apps',
      'Generative AI',
      'UI & UX Design',
      'App Design',
      'Product Design',
    ],
  },
  {
    num: '03',
    code: '3',
    name: 'Marketing',
    items: [
      'Conversion Rate Optimization',
      'Email & SMS Design',
      'Ad Creatives Design',
      'Generative AI',
      'Strategy & Consultation',
      'Campaigns Strategy',
    ],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each column in with stagger
      gsap.fromTo(
        '.service-column',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        backgroundColor: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Desktop / Tablet Grid */}
      <div className="services-grid">
        {CATEGORIES.map((cat, index) => (
          <div
            key={cat.num}
            className="service-column"
            style={{
              borderRight: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: `${20 + index * 20}vh`,
              paddingLeft: 'clamp(24px, 3vw, 48px)',
              paddingRight: 'clamp(24px, 3vw, 48px)',
              paddingBottom: '120px',
              position: 'relative',
              minHeight: '80vh',
            }}
          >
            {/* Background Watermark */}
            <div
              className="watermark"
              style={{
                position: 'absolute',
                top: `${10 + index * 18}vh`,
                left: '0',
                fontSize: 'clamp(140px, 16vw, 260px)',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                color: 'rgba(255, 255, 255, 0.03)',
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              ({cat.num})
            </div>

            {/* Mixed-Font Heading */}
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--color-text-primary)',
                marginBottom: '48px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <span
                className="font-script"
                style={{
                  fontSize: '1.15em',
                  display: 'inline-block',
                  marginRight: '-0.04em',
                }}
              >
                {cat.name.charAt(0)}
              </span>
              <span
                className="font-body"
                style={{ fontWeight: 400 }}
              >
                {cat.name.slice(1)}
              </span>
            </h2>

            {/* Numbered List */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative', zIndex: 1 }}>
              {cat.items.map((item, i) => (
                <li
                  key={item}
                  className="service-list-item"
                  style={{
                    fontSize: '14px',
                    lineHeight: 2.4,
                    color: 'var(--color-text-secondary)',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    transition: 'color 0.3s ease',
                    cursor: 'default',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--color-text-tertiary)',
                      marginRight: '14px',
                      fontSize: '13px',
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: '0.02em',
                    }}
                  >
                    ({cat.code}.{i + 1})
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* 4th column - subtle divider / spacing */}
        <div
          className="service-column-divider"
          style={{
            borderRight: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            minHeight: '80vh',
          }}
        />

        {/* 5th column - right edge accent */}
        <div
          className="service-column-accent"
          style={{
            position: 'relative',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 'clamp(24px, 3vw, 48px)',
          }}
        >
          <span
            style={{
              fontSize: 'clamp(24px, 3vw, 48px)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            W.
          </span>
          <span
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              fontFamily: "'Inter', system-ui, sans-serif",
              marginTop: '24px',
            }}
          >
            Nominee
          </span>
        </div>
      </div>

      {/* Inline responsive styles for this section */}
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          width: 100%;
        }
        .service-list-item:hover {
          color: var(--color-text-primary) !important;
        }

        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .service-column-divider,
          .service-column-accent {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .service-column {
            padding-top: 80px !important;
            min-height: auto !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
          .watermark {
            top: 20px !important;
            font-size: 120px !important;
          }
        }
      `}</style>
    </section>
  );
}
