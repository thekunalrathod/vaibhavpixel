import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from './sections/LoadingScreen';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ClientMarquee from './sections/ClientMarquee';
import AboutSection from './sections/AboutSection';
import FeaturesGrid from './sections/FeaturesGrid';
import ProcessSection from './sections/ProcessSection';
import PortfolioShowcase from './sections/PortfolioShowcase';
import ServicesSection from './sections/ServicesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import FAQSection from './sections/FAQSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: any;

    async function initLenis() {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 0.3,
        touchMultiplier: 0.7,
        infinite: false,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0, 0);
    }

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
      gsap.ticker.remove(() => {});
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fade-in-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleLoadComplete = () => {
    // Animate content in after loader fades
    gsap.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
  };

  return (
    <div ref={mainRef} className="relative min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <LoadingScreen onComplete={handleLoadComplete} />
      <div ref={contentRef} style={{ opacity: 0 }}>
        <div className="grain-overlay" />
        <Navigation />
        <main>
          <HeroSection />
          <ClientMarquee />
          <AboutSection />
          <FeaturesGrid />
          <ProcessSection />
          <PortfolioShowcase />
          <ServicesSection />
          <TestimonialsSection />
          <PricingSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
