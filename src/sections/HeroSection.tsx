import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const IMAGES = [
  '/images/hero-project-1.jpg', '/images/hero-project-2.jpg',
  '/images/hero-project-3.jpg', '/images/hero-project-4.jpg',
  '/images/hero-project-5.jpg', '/images/hero-project-6.jpg',
  '/images/hero-project-7.jpg', '/images/hero-project-8.jpg',
  '/images/hero-project-1.jpg', '/images/hero-project-3.jpg',
  '/images/hero-project-5.jpg', '/images/hero-project-7.jpg',
  '/images/hero-project-2.jpg', '/images/hero-project-4.jpg',
  '/images/hero-project-6.jpg', '/images/hero-project-8.jpg',
  '/images/hero-project-1.jpg', '/images/hero-project-5.jpg',
  '/images/hero-project-3.jpg', '/images/hero-project-7.jpg',
];

const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D uTexture; uniform vec2 uPlaneSizes; uniform vec2 uImageSizes;
  varying vec2 vUv;
  void main() {
    vec2 ratio = vec2(
      min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
      min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
    );
    vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);
    gl_FragColor = texture2D(uTexture, uv);
  }
`;

/* ─── Mouse spotlight cursor ─── */
function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed"
      style={{
        zIndex: 8,
        width: 500,
        height: 500,
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 40%, transparent 70%)',
        mixBlendMode: 'screen',
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
      }}
    />
  );
}

/* ─── Card with depth variation ─── */
interface CardProps {
  texture: THREE.Texture;
  index: number;
  total: number;
  gridCols: number;
  cardW: number;
  cardH: number;
  gap: number;
  scrollVelRef: React.MutableRefObject<number>;
  offsetRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

function Card({
  texture, index, total, gridCols, cardW, cardH, gap,
  scrollVelRef, offsetRef, mouseRef,
}: CardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const col = index % gridCols;
  const row = Math.floor(index / gridCols);
  const staggerRow = col * 0.5;
  const totalRows = Math.ceil(total / gridCols);
  const rightBias = col < 2 ? 0.6 : 1.0;
  const posX = (col - (gridCols - 1) / 2 + 0.8) * (cardW + gap) * rightBias;
  const baseY = ((row + staggerRow * 0.4) - (totalRows - 1) / 2) * (cardH + gap);

  const depthSeed = useMemo(() => (index * 7919) % 100 / 100, [index]);
  const baseZ = useMemo(() => -Math.pow(depthSeed - 0.5, 2) * 6 - 2, [depthSeed]);
  const baseRotY = useMemo(() => (depthSeed - 0.5) * 0.5, [depthSeed]);
  const parallaxMult = useMemo(() => 0.5 + depthSeed * 1.5, [depthSeed]);

  const cylinderRadius = 4.5;

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uPlaneSizes: { value: new THREE.Vector2(cardW, cardH) },
    uImageSizes: { value: new THREE.Vector2((texture.image as HTMLImageElement)?.naturalWidth || 600, (texture.image as HTMLImageElement)?.naturalHeight || 400) },
  }), [texture, cardW, cardH]);

  useFrame(() => {
    if (!meshRef.current) return;

    const speed = 0.35;
    const currentOffset = offsetRef.current * speed;
    const cycleX = gridCols * (cardW + gap);
    const cycleY = totalRows * (cardH + gap) * 0.7;

    let wrappedOffset = currentOffset % (cycleX + cycleY);
    if (wrappedOffset < 0) wrappedOffset += cycleX + cycleY;

    const dx = wrappedOffset * 0.6;
    const dy = -wrappedOffset * 0.4;

    let finalX = posX + dx;
    let finalY = baseY + dy;

    finalX = ((finalX + cycleX / 2) % cycleX + cycleX) % cycleX - cycleX / 2;
    finalY = ((finalY + cycleY / 2) % cycleY + cycleY) % cycleY - cycleY / 2;

    const mx = (mouseRef.current.x / window.innerWidth - 0.5) * 2;
    const my = (mouseRef.current.y / window.innerHeight - 0.5) * 2;
    const mouseParallaxX = -mx * 0.15 * parallaxMult;
    const mouseParallaxY = my * 0.1 * parallaxMult;

    const normalizedX = finalX / (cycleX / 2);
    const zOffset = -Math.pow(normalizedX, 2) * cylinderRadius + baseZ;
    const rotY = normalizedX * 0.4 + baseRotY;

    meshRef.current.position.x = finalX + mouseParallaxX;
    meshRef.current.position.y = finalY + mouseParallaxY;
    meshRef.current.position.z = zOffset;
    meshRef.current.rotation.y = rotY;

    const vel = scrollVelRef.current;
    meshRef.current.rotation.z = vel * 0.04;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[cardW, cardH]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent />
    </mesh>
  );
}

/* ─── Radial glow on right side ─── */
function RightGlow() {
  return (
    <div
      className="absolute pointer-events-none hidden lg:block"
      style={{
        zIndex: 4,
        top: '20%',
        right: 0,
        width: '35%',
        height: '60%',
        background: 'radial-gradient(ellipse at 80% 50%, rgba(40,40,40,0.3) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}
    />
  );
}

function Tunnel({
  scrollVelRef, offsetRef, mouseRef,
}: {
  scrollVelRef: React.MutableRefObject<number>;
  offsetRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const textures = useLoader(THREE.TextureLoader, IMAGES);
  return (
    <>
      <ambientLight intensity={1} />
      {textures.map((tex, i) => (
        <Card key={i} texture={tex} index={i} total={IMAGES.length} gridCols={5} cardW={2.8} cardH={1.9} gap={0.4}
          scrollVelRef={scrollVelRef} offsetRef={offsetRef} mouseRef={mouseRef} />
      ))}
    </>
  );
}

/* ─── Sparkle icon component ─── */
function SparkleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ opacity: 0.6 }}>
      <path
        d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollVelRef = useRef(0);
  const offsetRef = useRef(0);
  const lastScrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      scrollVelRef.current = (scrollY - lastScrollRef.current) * 0.01;
      lastScrollRef.current = scrollY;
      offsetRef.current = (scrollY / (document.body.scrollHeight - window.innerHeight || 1)) * 30;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let raf: number;
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const animate = () => {
      offsetRef.current += 0.008;
      scrollVelRef.current *= 0.95;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text-item', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12, delay: 2.0 });
      gsap.fromTo('.hero-cta', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 2.6 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 750, backgroundColor: '#050505' }}>
      {/* Mouse spotlight cursor */}
      <MouseSpotlight />

      {/* WebGL Canvas */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Canvas camera={{ position: [2.5, 0, 10], fov: 50 }} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }} dpr={Math.min(2, window.devicePixelRatio)} style={{ background: '#050505' }}>
          <Tunnel scrollVelRef={scrollVelRef} offsetRef={offsetRef} mouseRef={mouseRef} />
        </Canvas>
      </div>

      {/* Right side radial glow */}
      <RightGlow />

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-[22%] pointer-events-none" style={{ zIndex: 5, background: 'linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, transparent 100%)' }} />

      {/* Main bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 5, height: '75%', background: 'linear-gradient(to top, #050505 0%, #050505 10%, rgba(5,5,5,0.97) 25%, rgba(5,5,5,0.85) 40%, rgba(5,5,5,0.5) 60%, transparent 100%)' }} />

      {/* Extra text-zone darkening — left half */}
      <div className="absolute bottom-0 left-0 pointer-events-none hidden lg:block" style={{ zIndex: 6, width: '60%', height: '65%', background: 'radial-gradient(ellipse at 15% 90%, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.8) 30%, transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{ zIndex: 6, width: '55%', height: '60%', background: 'linear-gradient(to right, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.85) 30%, rgba(5,5,5,0.5) 50%, transparent 100%)', filter: 'blur(40px)' }} />

      {/* ─── Hero Text — Bottom Left ─── */}
      <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 10, paddingBottom: 56, paddingTop: 100 }}>
        <div className="container-main">

          {/* Currently Open */}
          <div className="hero-text-item flex items-center gap-2.5 mb-6">
            <span className="inline-block w-[6px] h-[6px] rounded-full" style={{ backgroundColor: '#4ADE80', boxShadow: '0 0 8px rgba(74,222,128,0.4)' }} />
            <span className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>Currently Open</span>
          </div>

          {/* Headline — Script "Premium" + Sans-serif rest, TIGHT leading */}
          <h1 className="hero-text-item max-w-[550px] mb-8" style={{ lineHeight: 0.95 }}>
            <span
              className="font-script block"
              style={{
                fontSize: 'clamp(52px, 6.5vw, 88px)',
                color: 'var(--color-text-primary)',
                lineHeight: 0.85,
                marginBottom: 4,
              }}
            >
              Premium
            </span>
            <span
              className="font-body block font-normal"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              design expertise backed by bandwidth that doesn't break.
            </span>
          </h1>

          {/* Description — medium gray, 45ch max-width */}
          <p className="hero-text-item mb-10" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6, maxWidth: '45ch' }}>
            Your dedicated design team for brand, web, email, and everything that touches design.
            One flat fee, unlimited requests, managed through Slack and Notion. No hiring. No freelancer roulette.
          </p>

          {/* CTA — minimal text with underline + sparkle */}
          <div className="hero-cta flex items-center gap-5">
            <a
              href="#pricing"
              className="group inline-flex items-center gap-3 font-body text-sm font-medium"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <span className="relative pb-1">
                Book A Call
                <span className="absolute bottom-0 left-0 w-full h-px bg-white/30 group-hover:bg-white/60 transition-colors duration-300" />
              </span>
              <SparkleIcon size={14} />
            </a>
          </div>

        </div>
      </div>

      {/* Nominee badge */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:flex" style={{ zIndex: 10 }}>
        <span className="text-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-tertiary)', writingMode: 'vertical-rl' }}>Nominee</span>
      </div>

      {/* Cursor hint */}
      <div className="absolute bottom-8 right-8 hidden xl:block pointer-events-none" style={{ zIndex: 10 }}>
        <span className="text-mono text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>Move cursor to explore</span>
      </div>
    </section>
  );
}
