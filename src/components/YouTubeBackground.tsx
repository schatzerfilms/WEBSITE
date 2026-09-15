import { useEffect, useRef, useState } from 'react';

interface YouTubeBackgroundProps {
    videoId: string;
    start?: number;
    end?: number;
}

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

export function YouTubeBackground({ videoId, start = 0, end }: YouTubeBackgroundProps) {
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let isCancelled = false;
        let checkInterval: NodeJS.Timeout;

        function initPlayer() {
            if (isCancelled || !containerRef.current) return;
            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    rel: 0,
                    showinfo: 0,
                    mute: 1,
                    vq: 'hd1080'
                },
                events: {
                    onReady: (event: any) => {
                        event.target.playVideo();
                        event.target.mute();
                        event.target.seekTo(start);
                        setIsLoaded(true);
                    },
                    onStateChange: (event: any) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                        }
                        if (event.data === window.YT.PlayerState.ENDED) {
                            event.target.seekTo(start);
                            event.target.playVideo();
                        }
                    }
                }
            });
        }

        if (!window.YT || !window.YT.Player) {
            const scriptId = 'yt-iframe-api';
            if (!document.getElementById(scriptId)) {
                const tag = document.createElement('script');
                tag.id = scriptId;
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
            }
            // Poll for YT.Player
            checkInterval = setInterval(() => {
                if (window.YT && window.YT.Player) {
                    clearInterval(checkInterval);
                    initPlayer();
                }
            }, 100);
        } else {
            initPlayer();
        }

        return () => {
            isCancelled = true;
            if (checkInterval) clearInterval(checkInterval);
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy();
            }
        };
    }, [videoId, start]);

    // Timer check just in case the 'ENDED' event doesn't fire nicely due to the 'end' param
    useEffect(() => {
        if (!end || !isLoaded) return;

        const interval = setInterval(() => {
            if (playerRef.current && playerRef.current.getCurrentTime) {
                const currentTime = playerRef.current.getCurrentTime();
                if (currentTime >= end - 0.2) { // 200ms threshold
                    playerRef.current.seekTo(start);
                }
            }
        }, 100);

        return () => clearInterval(interval);
    }, [start, end, isLoaded]);

    return (
        <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 transition-opacity duration-[2000ms] ease-in-out ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
            {/* The 16:9 Aspect Ratio tricky container to mimic object-cover */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: '100vw',
                    height: '56.25vw', // 16:9
                    minHeight: '100vh',
                    minWidth: '177.77vh' // 16:9
                }}
            >
                {/* The target div for the YouTube iframe */}
                <div ref={containerRef} className="w-full h-full border-0 pointer-events-none opacity-40 md:opacity-50" />
            </div>
        </div>
    );
}
