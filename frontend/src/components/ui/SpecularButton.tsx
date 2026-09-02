'use client';

import { useEffect, useRef, type CSSProperties, type MouseEventHandler, type ReactNode } from 'react';

type ButtonSize = 'sm' | 'md' | 'lg';

export interface SpecularButtonProps {
  children?: ReactNode;
  size?: ButtonSize;
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-[22px] py-[10px] text-[0.85rem]',
  md: 'px-[30px] py-[14px] text-base',
  lg: 'px-10 py-[18px] text-[1.15rem]',
};

/** Shared rich-purple CTA treatment for the landing page. */
export default function SpecularButton({
  children = 'Get Started',
  size = 'md',
  radius = 7,
  tint = '#5748b6',
  tintOpacity = 1,
  blur = 0,
  textColor = '#ffffff',
  lineColor = '#ffffff',
  baseColor = '#493b9e',
  intensity = 1,
  speed = 0.35,
  autoAnimate = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}: SpecularButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    let frame = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = ((now - start) / 1000) * speed;
      button.style.setProperty('--sb-angle', `${autoAnimate ? elapsed * 90 : 135}deg`);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [autoAnimate, speed]);

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`group relative m-0 inline-flex cursor-pointer items-center justify-center overflow-hidden border font-medium leading-none tracking-[0.01em] outline-none transition-all duration-200 active:scale-[0.97] disabled:cursor-default disabled:opacity-55 disabled:active:scale-100 ${sizeClasses[size]} ${className}`}
      style={{
        '--sb-radius': `${radius}px`,
        '--sb-tint': tint,
        '--sb-tint-opacity': tintOpacity,
        '--sb-blur': `${blur}px`,
        '--sb-text': textColor,
        '--sb-line': lineColor,
        '--sb-base': baseColor,
        '--sb-intensity': intensity,
        '--sb-angle': '135deg',
        borderRadius: 'var(--sb-radius)',
        color: 'var(--sb-text)',
        background: `linear-gradient(135deg, color-mix(in srgb, var(--sb-tint) 100%, white 10%), var(--sb-base)), color-mix(in srgb, var(--sb-tint) calc(var(--sb-tint-opacity) * 100%), transparent)`,
        backdropFilter: `blur(var(--sb-blur))`,
      } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[calc(var(--sb-intensity)*0.72)] transition-opacity duration-200 group-hover:opacity-100   "
        style={{
          borderRadius: 'inherit',
          background: 'linear-gradient(var(--sb-angle), transparent 25%, color-mix(in srgb, var(--sb-line) 55%, transparent) 45%, transparent 62%)',
          mixBlendMode: 'screen',
        }}
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(19,10,72,0.35),0_8px_22px_rgba(48,25,135,0.28)]" />
      <span className="relative z-[1]">{children}</span>
    </button>
  );
}
