import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const photographySamples = [
    { id: 1, image: '/RS3_LIMO-38.jpg' },
    { id: 2, image: '/RS5_Roller_1.1.1.png' },
    { id: 3, image: '/Bildschirmfoto_2026-03-12_um_22.14.27.png' },
    { id: 4, image: '/Bildschirmfoto_2026-03-12_um_22.15.14.png' }
];

export function PhotographyPreview() {
    return (
        <section id="photography-preview" className="py-24 px-6 md:px-12 bg-black relative z-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight">
                            PHOTOGRAPHY
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link
                            to="/photography"
                            className="text-white/60 hover:text-white uppercase tracking-widest text-sm font-semibold transition-colors flex items-center gap-2"
                        >
                            View Full Gallery
                            <span className="text-xl">→</span>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photographySamples.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="group relative overflow-hidden aspect-[4/5] bg-surface cursor-pointer"
                        >
                            <img
                                src={photo.image}
                                alt={`Photography snippet ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
