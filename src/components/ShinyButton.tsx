import { motion, type AnimationProps } from 'framer-motion';

const shimmerAnimation = {
    initial: { '--x': '100%' },
    animate: { '--x': '-100%' },
    whileTap: { scale: 0.97 },
    transition: {
        stiffness: 20,
        damping: 15,
        mass: 2,
        type: 'spring',
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1,
    },
} satisfies AnimationProps;

interface ShinyButtonProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
}

export function ShinyButton({ children, className = '', href }: ShinyButtonProps) {
    return (
        <motion.a
            href={href}
            {...shimmerAnimation}
            className={`relative inline-block rounded-lg px-8 py-3 font-sans font-semibold tracking-[0.2em] uppercase text-sm
        border border-white/10 bg-transparent cursor-pointer
        transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]
        ${className}`}
        >
            {/* Text with mask shimmer */}
            <span
                className="relative z-10 block text-neutral-400 text-sm tracking-[0.2em]"
                style={{
                    maskImage:
                        'linear-gradient(-75deg, white calc(var(--x) + 20%), transparent calc(var(--x) + 30%), white calc(var(--x) + 100%))',
                    WebkitMaskImage:
                        'linear-gradient(-75deg, white calc(var(--x) + 20%), transparent calc(var(--x) + 30%), white calc(var(--x) + 100%))',
                } as React.CSSProperties}
            >
                {children}
            </span>

            {/* Shimmer highlight overlay */}
            <span
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                    background:
                        'linear-gradient(-75deg, transparent calc(var(--x) + 20%), rgba(255,255,255,0.08) calc(var(--x) + 25%), transparent calc(var(--x) + 100%))',
                } as React.CSSProperties}
            />
        </motion.a>
    );
}
