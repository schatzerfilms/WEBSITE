import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/** Reusable fade-in-up wrapper triggered by scroll */
function ScrollReveal({
    children,
    delay = 0,
    className = '',
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
                duration: 0.9,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Parallax: hero image moves slower than scroll
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const heroTitleY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
    const heroTitleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* 1. Hero Banner Section – with parallax */}
            <section
                ref={heroRef}
                className="relative w-full h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden"
            >
                {/* Background Image with parallax */}
                <motion.div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ y: heroImageY, scale: heroImageScale }}
                >
                    <img
                        src="/ABOU BG.jpg"
                        alt="About Background"
                        className="w-full h-full object-cover object-center opacity-80"
                    />
                </motion.div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

                {/* Foreground Title – fades out on scroll */}
                <motion.div
                    className="relative z-10 w-full px-8 md:px-16 lg:px-24 xl:px-32"
                    style={{ y: heroTitleY, opacity: heroTitleOpacity }}
                >
                    <motion.h1
                        className="text-5xl md:text-8xl lg:text-[7rem] xl:text-[10rem] font-bold tracking-tight uppercase leading-[0.9] text-white italic"
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        ABOUT
                    </motion.h1>
                </motion.div>
            </section>

            {/* 2. Info Text Section (Logo + Text) – scroll reveal */}
            <section className="relative w-full bg-black py-24 md:py-32 px-8 md:px-16 lg:px-24 flex items-center justify-center">
                <div className="max-w-4xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                    {/* Logo */}
                    <ScrollReveal delay={0}>
                        <img
                            src="/Zeichenflache_2_Kopie_2-2.png"
                            alt="SCHATZER Logo"
                            className="h-8 md:h-10 w-auto object-contain shrink-0 mt-1"
                        />
                    </ScrollReveal>
                    {/* Text */}
                    <ScrollReveal delay={0.15} className="flex-1">
                        <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed">
                            <strong className="text-white hidden md:inline">
                                is a creative content agency specialized in high-end film and
                                photo production.{' '}
                            </strong>
                            <span className="md:hidden text-white font-semibold">
                                is a creative content agency specialized in high-end film and
                                photo production.{' '}
                            </span>
                            From outdoor sports to everyday businesses, we create authentic,
                            dynamic visual content that connects. Fueled by a large network of
                            creators, models, and athletes, we assemble the perfect team for
                            every project — delivering tailored visual solutions that truly fit
                            your brand and story.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* 3. Marcel Schatzer Team Cards – Interactive Glassmorphism */}
            <section className="relative w-full bg-black pb-32 px-8 flex flex-col justify-center items-center">
                <ScrollReveal delay={0.1}>
                    <div className="flex flex-col items-center">
                        {/* The 3-Card Glassmorphism Stack - Simple Flex Layout for Zero Lag 
                            Using Tailwind 'group' semantics for a beautiful interconnected hover state 
                        */}
                        <div className="relative w-full max-w-5xl mx-auto mt-12 md:mt-24 group">
                            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12">
                                {[
                                    { r: -2, src: '/MARCEL PF.png' },
                                    { r: 0, z: 10, src: '/RS3 LIMO SCHATZER-2.jpg' },
                                    { r: 2, src: '/RS3 LIMO SCHATZER-4.jpg' },
                                ].map((card, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="relative w-[280px] h-[380px] md:w-[300px] md:h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.5)] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm transition-all duration-500 ease-out sm:group-hover:opacity-30 sm:group-hover:scale-95 sm:hover:!opacity-100 sm:hover:!scale-105 sm:hover:!-translate-y-4 hover:z-50"
                                            style={{
                                                transform: `rotate(${card.r}deg)`,
                                                zIndex: card.z || 1,
                                            }}
                                        >
                                            <img
                                                src={card.src}
                                                alt="Schatzer Portfolio"
                                                className="w-full h-full object-cover object-top opacity-80 transition-opacity duration-300 sm:group-hover:opacity-50 sm:hover:!opacity-100 sm:hover:brightness-110"
                                            />
                                            {/* Subtle gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 pointer-events-none transition-opacity duration-300 sm:hover:opacity-30" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Name Below Card */}
                        <h3 className="mt-12 text-2xl md:text-3xl font-bold tracking-widest text-white uppercase text-center selection:bg-white/20 selection:text-white">
                            Marcel Schatzer
                        </h3>
                    </div>
                </ScrollReveal >
            </section >
        </div >
    );
}
