import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const photographyImages = [
    { id: 1, image: '/RS3_LIMO-38.jpg', size: 'large' },
    { id: 2, image: '/RS5_Roller_1.1.1.png', size: 'tall' },
    { id: 3, image: '/Bildschirmfoto_2026-03-12_um_22.14.27.png', size: 'square' },
    { id: 4, image: '/Bildschirmfoto_2026-03-12_um_22.15.14.png', size: 'wide' },
    { id: 5, image: '/Bildschirmfoto_2026-03-12_um_22.16.05.png', size: 'tall' },
    { id: 6, image: '/RS3_LIMO-38.jpg', size: 'square' },
    { id: 7, image: '/RS5_Roller_1.1.1.png', size: 'large' },
    { id: 8, image: '/Bildschirmfoto_2026-03-12_um_22.15.14.png', size: 'wide' },
];

export function PhotographyPage() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Parallax scroll for the hero
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* Hero Section with parallax – uses first image as hero background */}
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
                        src="/RS3_LIMO-38.jpg"
                        alt="Photography Hero"
                        className="w-full h-full object-cover object-center opacity-60"
                    />
                </motion.div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

                {/* Foreground Title – fades on scroll */}
                <motion.div
                    className="relative z-10 w-full px-8 md:px-16 lg:px-24 xl:px-32"
                    style={{ y: titleY, opacity: titleOpacity }}
                >
                    <motion.h1
                        className="text-5xl md:text-8xl lg:text-[7rem] xl:text-[10rem] font-bold tracking-tight uppercase leading-[0.9] text-white italic"
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        PHOTOGRAPHY
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-gray-400 text-lg md:text-xl font-light max-w-2xl ml-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Capturing light, speed, and raw emotion in single moments.
                    </motion.p>
                </motion.div>
            </section>

            {/* Masonry Gallery */}
            <section className="bg-black pb-24 px-6 md:px-12">
                <div className="max-w-[90rem] mx-auto">
                    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {photographyImages.map((photo, i) => (
                            <motion.div
                                key={`${photo.id}-${i}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '50px' }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: (i % 5) * 0.1,
                                }}
                                className="break-inside-avoid relative group overflow-hidden bg-surface cursor-pointer rounded-sm"
                            >
                                <img
                                    src={photo.image}
                                    alt={`Photography piece ${i + 1}`}
                                    className="w-full h-auto transform transition-transform duration-1000 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
