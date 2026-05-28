import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';


type Props = {
  children: ReactNode;
  className?: string;
  /** pixels */
  lift?: number;
  /** 0..1 */
  opacity?: number;
  /** Enable/disable direction-aware behavior */
  directionAware?: boolean;
};

export function ScrollRevealHeading({
  children,
  className,
  lift = 22,
  opacity = 0.15,
  directionAware = true,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);

  const { scrollY } = useScroll();

  // Direction detection (based on scrollY delta)
  useEffect(() => {
    let last = scrollY.get();
    const unsub = scrollY.on('change', (v) => {
      const next = v;
      const d = next - last;
      if (Math.abs(d) > 0.5) setDir(d > 0 ? 1 : -1);
      last = next;
    });
    return () => unsub();
  }, [scrollY]);

  // Note: motion/react doesn’t provide a simple “per-element scroll progress” helper.
  // This component uses a pragmatic, global-scroll mapping to create a smooth
  // scroll-reactive feel while preserving direction-aware lift.


  const ySpring = useSpring(scrollY, { stiffness: 120, damping: 26 });

  // Direction affects sign of lift.
  const signedLift = directionAware ? dir * lift : lift;

  // Convert scrollY to a repeating, clamped 0..1-ish range for a dynamic effect.
  // Using modulus keeps it responsive even if sections are spaced.
  const progress = useTransform(ySpring, (v) => {
    const m = v % 1200;
    return Math.max(0, Math.min(1, m / 600));
  });

  const shinePosition = useTransform(ySpring, (v) => {
    const m = v % 1800;
    return `${(m / 1800) * 200}%`;
  });


  const translateY = useTransform(progress, (p) => {
    // When p increases, bring it into place.
    return (1 - p) * signedLift;
  });

  const scale = useTransform(progress, (p) => 0.985 + p * 0.02);
  const blur = useTransform(progress, (p) => (1 - p) * 6);
  const textOpacity = useTransform(progress, (p) => opacity + p * (1 - opacity));

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{
        display: 'inline-block',
        y: translateY as any,
        scale: scale as any,
        filter: blur as any,
        opacity: textOpacity as any,
        willChange: 'transform, filter, opacity',
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 28 }}
    >

      {/* Gradient “shine” (always visible) */}
      <motion.span
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(37,99,235,1), rgba(147,51,234,1), rgba(236,72,153,1))',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          backgroundPositionX: shinePosition,
        }}
      >
        {children}
      </motion.span>


    </motion.span>
  );
}

