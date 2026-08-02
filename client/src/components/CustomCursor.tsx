import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.getAttribute('role') === 'button' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('.card-ember') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer CAD Reticle Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[var(--ember)] flex items-center justify-center"
        animate={{
          x: pos.x - (isHovered ? 24 : 16),
          y: pos.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          scale: isHovered ? 1.15 : 1,
          backgroundColor: isHovered ? 'rgba(224, 58, 0, 0.08)' : 'transparent',
          borderColor: isHovered ? 'var(--ember)' : 'rgba(224, 58, 0, 0.5)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.2 }}
      >
        {/* Subtly animated inner CAD crosshair lines on hover */}
        {isHovered && (
          <>
            <div className="absolute w-2 h-[1px] bg-[var(--ember)] left-[-4px]" />
            <div className="absolute w-2 h-[1px] bg-[var(--ember)] right-[-4px]" />
            <div className="absolute h-2 w-[1px] bg-[var(--ember)] top-[-4px]" />
            <div className="absolute h-2 w-[1px] bg-[var(--ember)] bottom-[-4px]" />
          </>
        )}
      </motion.div>

      {/* Central Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[var(--ember)]"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          width: 6,
          height: 6,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />
    </>
  );
}
