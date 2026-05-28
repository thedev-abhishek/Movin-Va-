import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Start position in px */
  fromY?: number;
  /** End position in px */
  toY?: number;
  /** Seconds worth of motion smoothing */
  stiffness?: number;
  /** 0..1 text opacity range */
  fromOpacity?: number;
  toOpacity?: number;
  /** Direction of horizontal movement: 'ltr' (left-to-right), 'rtl' (right-to-left), or 'alternate' */
  direction?: 'ltr' | 'rtl' | 'alternate';
};

export function ScrollMoveText({
  children,
  className,
  fromY = 60,
  toY = 0,
  stiffness = 100,
  fromOpacity = 0,
  toOpacity = 1,
  direction = 'ltr',
}: Props) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const { scrollY } = useScroll();
  const smoothedY = useSpring(scrollY, { stiffness, damping: 20 });

  const [dir, setDir] = useState<1 | -1>(1);

  useEffect(() => {
    let last = scrollY.get();
    const unsub = scrollY.on('change', (v) => {
      const d = v - last;
      if (Math.abs(d) > 0.5) setDir(d > 0 ? 1 : -1);
      last = v;
    });
    return () => unsub();
  }, [scrollY]);

  // Base the scroll animation on the first 200px of scroll.
  // Clamp so at the very top (scrollY ~= 0) opacity/y are fully visible,
  // and we don't end up in a “hidden/restart” state due to scroll jitter.
  const progress = useTransform(smoothedY, [0, 200], [0, 1], { clamp: true });


  const translateY = useTransform(progress, (p) => {
    const base = fromY + (toY - fromY) * p;
    const overshoot = dir * 12 * (1 - p);
    return base - overshoot;
  });

  // Force fully visible at the top to avoid any initial “hidden” state.
  const opacity = useTransform(progress, [0, 1], [toOpacity, toOpacity]);


  const scale = useTransform(progress, [0, 1], [0.95, 1.05]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mql.matches);
    update();

    // Safari < 14 fallback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyMql: any = mql;
    if (anyMql.addEventListener) {
      anyMql.addEventListener('change', update);
      return () => anyMql.removeEventListener('change', update);
    }

    anyMql.addListener(update);
    return () => anyMql.removeListener(update);
  }, []);

  const translateX = useTransform(progress, (p) => {
    // On mobile, horizontal movement frequently gets clipped by parent `overflow-hidden`
    // and narrow viewport, causing characters to look cut/half.
    if (isMobile) return 0;

    let movement = 40;
    if (direction === 'rtl') {
      return -movement + movement * p; // Right to left: -40 to 0
    } else if (direction === 'ltr') {
      return movement - movement * p; // Left to right: 40 to 0
    } else {
      // Alternate: moves based on scroll direction
      return dir > 0 ? movement - movement * p : -movement + movement * p;
    }
  });


  return (
    <motion.span
      ref={spanRef}
      className={className}
      style={{
        display: 'inline-block',
        y: translateY as any,
        x: translateX as any,
        scale: scale as any,
        opacity: opacity as any,
        willChange: 'transform, opacity',
      }}
    >
      <span style={{ display: 'inline-block' }}>
        {children}
      </span>
    </motion.span>
  );
}

