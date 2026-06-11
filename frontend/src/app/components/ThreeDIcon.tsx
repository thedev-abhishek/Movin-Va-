import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from './ui/utils';

export interface ThreeDIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string; // e.g., 'blue', 'purple', 'pink', 'emerald', 'indigo', 'cyan', 'violet', 'amber', 'teal', 'sky', 'rose', 'orange'
  gradient?: string; // e.g., 'from-blue-400 to-blue-600'
  className?: string; // outer container wrapper classes
  iconClassName?: string; // classes applied directly to the lucide icon
  variant?: 'coin' | 'flat' | 'badge' | 'social' | 'logo';
  depth?: number; // custom depth offset, if needed
}

export function ThreeDIcon({
  icon: Icon,
  size = 24,
  color = 'blue',
  gradient,
  className,
  iconClassName,
  variant = 'coin',
  depth,
}: ThreeDIconProps) {
  
  // Resolve styles (front face gradient, edge/depth gradient, text color)
  const resolveStyles = () => {
    const source = gradient || color || 'blue';
    let baseColor = 'blue';

    if (source.includes('purple')) baseColor = 'purple';
    else if (source.includes('pink')) baseColor = 'pink';
    else if (source.includes('emerald')) baseColor = 'emerald';
    else if (source.includes('indigo')) baseColor = 'indigo';
    else if (source.includes('cyan')) baseColor = 'cyan';
    else if (source.includes('violet')) baseColor = 'violet';
    else if (source.includes('amber')) baseColor = 'amber';
    else if (source.includes('teal')) baseColor = 'teal';
    else if (source.includes('sky')) baseColor = 'sky';
    else if (source.includes('rose')) baseColor = 'rose';
    else if (source.includes('orange')) baseColor = 'orange';

    const stylesMap: Record<string, { front: string; edge: string; text: string }> = {
      blue: { front: 'from-blue-400 to-blue-600', edge: 'from-blue-600 to-blue-800', text: 'text-blue-600 dark:text-blue-400' },
      purple: { front: 'from-purple-400 to-purple-600', edge: 'from-purple-600 to-purple-800', text: 'text-purple-600 dark:text-purple-400' },
      pink: { front: 'from-pink-400 to-pink-600', edge: 'from-pink-600 to-pink-800', text: 'text-pink-600 dark:text-pink-400' },
      emerald: { front: 'from-emerald-500 to-emerald-600', edge: 'from-emerald-600 to-emerald-800', text: 'text-emerald-600 dark:text-emerald-400' },
      indigo: { front: 'from-indigo-400 to-indigo-600', edge: 'from-indigo-600 to-indigo-800', text: 'text-indigo-600 dark:text-indigo-400' },
      cyan: { front: 'from-cyan-400 to-cyan-600', edge: 'from-cyan-600 to-cyan-800', text: 'text-cyan-600 dark:text-cyan-400' },
      violet: { front: 'from-violet-400 to-violet-600', edge: 'from-violet-600 to-violet-800', text: 'text-violet-600 dark:text-violet-400' },
      amber: { front: 'from-amber-400 to-amber-600', edge: 'from-amber-600 to-amber-800', text: 'text-amber-600 dark:text-amber-400' },
      teal: { front: 'from-teal-400 to-teal-600', edge: 'from-teal-600 to-teal-800', text: 'text-teal-600 dark:text-teal-400' },
      sky: { front: 'from-sky-400 to-sky-600', edge: 'from-sky-600 to-sky-800', text: 'text-sky-600 dark:text-sky-400' },
      rose: { front: 'from-rose-400 to-rose-600', edge: 'from-rose-600 to-rose-800', text: 'text-rose-600 dark:text-rose-400' },
      orange: { front: 'from-orange-400 to-orange-600', edge: 'from-orange-600 to-orange-800', text: 'text-orange-600 dark:text-orange-400' },
    };

    const resolved = stylesMap[baseColor] || stylesMap.blue;

    if (gradient) {
      resolved.front = gradient;
    }

    return { ...resolved, baseColor };
  };

  const { front, edge, text, baseColor } = resolveStyles();

  // 1. Flat Variant (No solid coin/block wrapper, just apply a 3D drop shadow filter directly to SVG)
  if (variant === 'flat') {
    const colorHexMap: Record<string, string> = {
      blue: 'rgba(59, 130, 246, 0.45)',
      purple: 'rgba(168, 85, 247, 0.45)',
      pink: 'rgba(236, 72, 153, 0.45)',
      emerald: 'rgba(16, 185, 129, 0.45)',
      indigo: 'rgba(99, 102, 241, 0.45)',
      cyan: 'rgba(6, 182, 212, 0.45)',
      violet: 'rgba(139, 92, 246, 0.45)',
      amber: 'rgba(245, 158, 11, 0.45)',
      teal: 'rgba(20, 184, 166, 0.45)',
      sky: 'rgba(14, 165, 233, 0.45)',
      rose: 'rgba(244, 63, 94, 0.45)',
      orange: 'rgba(249, 115, 22, 0.45)',
    };
    
    const shadowColor = colorHexMap[baseColor] || 'rgba(0, 0, 0, 0.15)';
    const filterStyle = {
      filter: `drop-shadow(1px 1px 0px ${shadowColor}) drop-shadow(2px 2px 0px ${shadowColor}) drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.3))`
    };

    return (
      <Icon
        className={cn(text, className, iconClassName)}
        size={size}
        style={filterStyle}
      />
    );
  }

  // 2. Rounded Coin/Block/Badge Wrapper Variants
  const isCircle = variant === 'social';
  const radiusClass = isCircle ? 'rounded-full' : 'rounded-2xl';
  
  // Set default translations based on variant
  const yOffset = depth || (variant === 'badge' ? 2 : 4);
  const shadowYOffset = yOffset + 2;

  // Render the front, edge, and shadow layers
  return (
    <div className={cn("relative select-none", className)} style={{ width: size * 2, height: size * 2 }}>
      {/* 3D Ambient Shadow Layer */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/15 dark:bg-black/35 blur-[2.5px] pointer-events-none transition-all duration-200", 
          radiusClass
        )}
        style={{
          transform: `translateY(${shadowYOffset}px)`
        }}
      />

      {/* 3D Edge Layer (gives it thickness/depth) */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-all duration-200", 
          edge, 
          radiusClass
        )}
        style={{
          transform: `translateY(${yOffset}px)`
        }}
      />

      {/* 3D Front Face Layer (holds the icon) */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br flex items-center justify-center border border-white/20 dark:border-white/10 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.4)] transition-all duration-200", 
          front, 
          radiusClass
        )}
        style={{
          transform: 'translateY(0px)'
        }}
      >
        <Icon 
          className={cn("text-white", iconClassName)} 
          size={size} 
          style={{
            filter: 'drop-shadow(1px 1px 0px rgba(0,0,0,0.15)) drop-shadow(2px 2px 1.5px rgba(0,0,0,0.3))'
          }}
        />
      </div>
    </div>
  );
}
