import React, { useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import projectsData from '../projects.json';
import { YouTubeBackground } from '../components/YouTubeBackground';

export function ProjectPage() {
    const { id } = useParams();
    const project = id ? projectsData.find(p => p.id === id) : null;
    const heroRef = useRef<HTMLDivElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play().catch(() => { });
            }
        }, 1100);
        return () => clearTimeout(timer);
    }, [id]);

    // Parallax scroll
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const heroVideoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const heroVideoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    if (!project) {
        return <Navigate to="/#work" replace />;
    }

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* 1. Video Hero Section – with parallax */}
            <section
                ref={heroRef}
                className="relative w-full h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden"
            >
                {/* Background Video with parallax */}
                <motion.div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ y: heroVideoY, scale: heroVideoScale }}
                >
                    {(project as any).bgYtUrl ? (
                        <YouTubeBackground
                            videoId={(project as any).bgYtUrl}
                            start={(project as any).bgYtLoopStart}
                            end={(project as any).bgYtLoopEnd}
                        />
                    ) : (
                        <video
                            ref={videoRef}
                            src={project.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 md:opacity-50 z-0"
                        />
                    )}
                </motion.div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

                {/* Foreground Content – fades out on scroll */}
                <motion.div
                    className="relative z-10 w-full px-8 md:px-16 lg:px-24 xl:px-32"
                    style={{ y: titleY, opacity: titleOpacity }}
                >
                    <motion.h1
                        className="text-5xl md:text-8xl lg:text-[7rem] xl:text-[9rem] font-bold tracking-tight uppercase leading-[0.9] text-white italic"
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-xs md:text-sm font-sans tracking-widest text-white/50 uppercase ml-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        {project.year}
                    </motion.p>
                </motion.div>
            </section>

            {/* 2. YouTube Embed Section */}
            <section className="relative w-full bg-black py-24 md:py-48 flex justify-center px-8 md:px-16 lg:px-24">
                <div className="w-full max-w-[80rem] aspect-video rounded-xl overflow-hidden shrink-0 border border-white/5 shadow-2xl bg-[#0a0a0a]">
                    <iframe
                        src={`https://www.youtube.com/embed/${project.ytUrl}?autoplay=0&rel=0&showinfo=0`}
                        title={`${project.title} Video`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </section>
        </div>
    );
}
