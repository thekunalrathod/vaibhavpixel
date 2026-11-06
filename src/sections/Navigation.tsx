import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useScrambleText } from '../hooks/useScrambleText';

const NAV_LINKS = [
  { label: 'Benefits', href: '#features' },
  { label: 'Process', href: '#process' },
  { label: 'Capabilities', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
];

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M10 0L11.3 8.7L20 10L11.3 11.3L10 20L8.7 11.3L0 10L8.7 8.7L10 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function DribbbleIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XSocialIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ScrambleNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  const { displayText, scramble, reset } = useScrambleText(label);

  return (
    <a
      href={href}
      onClick={() => {
        reset();
        onClick();
      }}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className="font-mono font-normal tracking-tight transition-all duration-300 hover:text-white hover:tracking-wide"
      style={{
        color: 'var(--color-text-secondary)',
        fontSize: 'clamp(32px, 5vw, 56px)',
        lineHeight: 1.1,
      }}
    >
      {displayText}
    </a>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const handleLinkClick = () => closeMenu();
  const handleDrawerBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeMenu();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!drawerRef.current) return;

    if (menuOpen) {
      tlRef.current?.kill();
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.fromTo(
        drawerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      if (linksRef.current) {
        const links = linksRef.current.children;
        tl.fromTo(
          links,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
          '-=0.3'
        );
      }

      if (bottomRef.current) {
        tl.fromTo(
          bottomRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.2'
        );
      }
    } else {
      tlRef.current?.kill();
      gsap.to(drawerRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
      });
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          menuOpen ? 'nav-glass' : scrolled ? 'nav-glass' : 'bg-transparent'
        }`}
        style={{ height: 72 }}
      >
        <div
          className="container-main h-full flex items-center justify-between"
          style={{ borderBottom: menuOpen ? '1px solid var(--color-border)' : '1px solid transparent' }}
        >
          <a
            href="#"
            className="font-body text-[13px] font-medium uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-80"
            style={{ color: 'var(--color-text-primary)' }}
          >
            VAIBHAVPIXEL<sup className="text-[0.55em] ml-0.5 relative -top-1">&reg;</sup>
          </a>

          <div className="flex items-center gap-6">
            <a
              href="#works"
              className="hidden sm:flex items-center gap-2.5 text-[13px] font-medium tracking-wide transition-all duration-300 group"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={() => setHoveredLink('works')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-all duration-300 group-hover:rotate-90 group-hover:text-white"
                style={{ color: hoveredLink === 'works' ? '#fff' : 'var(--color-text-secondary)' }}
              >
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span className="relative transition-colors duration-300 group-hover:text-white">
                View Works
                <span
                  className="absolute -bottom-1 left-0 h-px bg-white transition-all duration-300"
                  style={{ width: hoveredLink === 'works' ? '100%' : '0%' }}
                />
              </span>
            </a>

            <button
              className="relative flex items-center justify-center transition-colors duration-300 hover:border-[#2A2A2A]"
              style={{
                width: 40,
                height: 40,
                border: '1px solid var(--color-border)',
                borderRadius: 6,
              }}
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span
                className="absolute block h-[1.5px] transition-all duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--color-text-primary)',
                  width: 14,
                  transform: menuOpen
                    ? 'rotate(45deg)'
                    : 'rotate(0deg) translateY(-3.5px)',
                }}
              />
              <span
                className="absolute block h-[1.5px] transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-text-primary)',
                  width: 14,
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="absolute block h-[1.5px] transition-all duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--color-text-primary)',
                  width: 14,
                  transform: menuOpen
                    ? 'rotate(-45deg)'
                    : 'rotate(0deg) translateY(3.5px)',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={drawerRef}
        className="fixed inset-0 z-[60]"
        style={{
          backgroundColor: 'rgba(5, 5, 5, 0.92)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          opacity: 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        onClick={handleDrawerBackdropClick}
      >
        <div
          className="h-full flex flex-col justify-center items-center container-main"
          style={{ paddingTop: 72 }}
        >
          <div ref={linksRef} className="flex flex-col items-center gap-5 sm:gap-6">
            {NAV_LINKS.map((link) => (
              <ScrambleNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={handleLinkClick}
              />
            ))}
          </div>
        </div>

        <div
          ref={bottomRef}
          className="absolute bottom-0 left-0 right-0"
          style={{
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'rgba(5, 5, 5, 0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="container-main flex items-center justify-between" style={{ height: 72 }}>
            <div className="flex-shrink-0" style={{ color: 'var(--color-text-primary)' }}>
              <SparkleIcon className="transition-colors duration-300 hover:text-white cursor-pointer" />
            </div>

            <div
              className="hidden sm:block text-center text-[11px] sm:text-[12px] leading-relaxed tracking-wide"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <span className="block">A creative-first design studio based out of India.</span>
              <span className="block">Specialising in branding, web design & development.</span>
            </div>

            <div className="flex items-center gap-4" style={{ color: 'var(--color-text-tertiary)' }}>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-white"
                style={{ color: 'var(--color-text-tertiary)' }}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-white"
                style={{ color: 'var(--color-text-tertiary)' }}
                aria-label="Dribbble"
              >
                <DribbbleIcon />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-white"
                style={{ color: 'var(--color-text-tertiary)' }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-white"
                style={{ color: 'var(--color-text-tertiary)' }}
                aria-label="X"
              >
                <XSocialIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
