import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Start position in px (vertical translateY). Avoid using if you see line overlap. */
  fromY?: number;
  /** End position in px (vertical translateY). */
  toY?: number;
  /** Seconds worth of motion smoothing */
  stiffness?: number;
  /** 0..1 text opacity range */
  fromOpacity?: number;
  toOpacity?: number;
  /** Direction of horizontal movement: 'ltr' (left-to-right), 'rtl' (right-to-left), or 'alternate' */
  direction?: "ltr" | "rtl" | "alternate";
  /** Disable translateY movement to prevent overlap in stacked heading lines. */
  noVerticalMove?: boolean;
};

export function ScrollMoveText({
  children,
  className,
  fromY = 60,
  toY = 0,
  stiffness = 100,
  fromOpacity = 0,
  toOpacity = 1,
  direction = "ltr",
  noVerticalMove = false,
}: Props) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const { scrollY } = useScroll();
  const smoothedY = useSpring(scrollY, { stiffness, damping: 20 });

  const [dir, setDir] = useState<1 | -1>(1);

  useEffect(() => {
    let last = scrollY.get();
    const unsub = scrollY.on("change", (v) => {
      const d = v - last;
      if (Math.abs(d) > 0.5) setDir(d > 0 ? 1 : -1);
      last = v;
    });
    return () => unsub();
  }, [scrollY]);

  // Base the scroll animation on the first 200px of scroll.
  const progress = useTransform(smoothedY, [0, 200], [0, 1], { clamp: true });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mql.matches);
    update();

    // Safari < 14 fallback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyMql: any = mql;
    if (anyMql.addEventListener) {
      anyMql.addEventListener("change", update);
      return () => anyMql.removeEventListener("change", update);
    }

    anyMql.addListener(update);
    return () => anyMql.removeListener(update);
  }, []);

  const translateY = useTransform(progress, (p) => {
    if (noVerticalMove) return 0;
    const base = fromY + (toY - fromY) * p;
    const overshoot = dir * 12 * (1 - p);
    return base - overshoot;
  });

  // Opacity (keep it stable; fromOpacity/fromOpacity are currently unused elsewhere)
  const opacity = useTransform(progress, [0, 1], [toOpacity, toOpacity]);

  const scale = useTransform(progress, [0, 1], [0.95, 1.05]);

  // Horizontal motion:
  // - if noVerticalMove: use a stronger slide to mimic animation without overlapping
  // - otherwise: keep original smaller slide behavior
  const xForNoVerticalMove = useTransform(progress, (p) => {
    if (isMobile) return 0;

    const movement = 70;
    const dirSign =
      direction === "rtl" ? -1 : direction === "ltr" ? 1 : dir > 0 ? 1 : -1;

    return dirSign * (movement - movement * p);
  });

  const xForVerticalMove = useTransform(progress, (p) => {
    if (isMobile) return 0;

    let movement = 40;
    if (direction === "rtl") {
      return -movement + movement * p;
    } else if (direction === "ltr") {
      return movement - movement * p;
    } else {
      return dir > 0 ? movement - movement * p : -movement + movement * p;
    }
  });

  return (
    <motion.span
      ref={spanRef}
      className={className}
      style={{
        display: "inline-block",
        y: translateY as any,
        x: (noVerticalMove ? xForNoVerticalMove : xForVerticalMove) as any,
        scale: scale as any,
        opacity: opacity as any,
        willChange: "transform, opacity",
      }}
    >
      <span style={{ display: "inline-block" }}>{children}</span>
    </motion.span>
  );
}

