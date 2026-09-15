import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Displays a fullscreen black overlay with the SCHATZER logo
 * whenever the route changes, giving images time to load.
 * Shows the overlay FIRST, then swaps content behind it.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);
    const prevPathRef = useRef(location.pathname);
    const pendingChildrenRef = useRef<React.ReactNode>(null);

    useEffect(() => {
        // Only trigger transition when the path actually changes
        if (location.pathname === prevPathRef.current) {
            // Same path – just sync children
            setDisplayChildren(children);
            return;
        }

        prevPathRef.current = location.pathname;

        // No loading animation when navigating to home
        if (location.pathname === '/') {
            setDisplayChildren(children);
            return;
        }

        // Store new children but DON'T show them yet
        pendingChildrenRef.current = children;

        // Show overlay IMMEDIATELY
        setIsLoading(true);

        // After overlay is fully opaque (~350ms), swap content behind it
        const swapTimer = setTimeout(() => {
            if (pendingChildrenRef.current) {
                setDisplayChildren(pendingChildrenRef.current);
                pendingChildrenRef.current = null;
            }
        }, 350);

        // After total duration, hide overlay to reveal new page
        const hideTimer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => {
            clearTimeout(swapTimer);
            clearTimeout(hideTimer);
        };
    }, [location.pathname, children]);

    return (
        <>
            {displayChildren}

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="page-transition"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-auto"
                    >
                        {/* SCHATZER Logo */}
                        <motion.img
                            src="/Zeichenflache_2_Kopie_2-2.png"
                            alt="Loading..."
                            className="w-32 md:w-40 h-auto"
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
