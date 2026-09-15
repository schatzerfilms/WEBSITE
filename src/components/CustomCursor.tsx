import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        // Use passive listener to prevent scroll/render blocking
        window.addEventListener('mousemove', updateMousePosition, { passive: true });
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[99999] hidden md:flex items-center justify-center mix-blend-difference will-change-transform"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
    );
}
