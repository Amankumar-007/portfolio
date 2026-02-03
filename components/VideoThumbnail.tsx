"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface VideoThumbnailProps {
  videoSrc?: string;
  posterSrc: string;
  alt: string;
  className?: string;
  isHovered: boolean;
}

export function VideoThumbnail({ videoSrc, posterSrc, alt, className, isHovered }: VideoThumbnailProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && videoSrc && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay error silently
      });
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, videoSrc]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {videoSrc ? (
        <>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
          >
            <source src={videoSrc} type="video/mp4" />
            <Image
              src={posterSrc}
              alt={alt}
              fill
              className="object-cover"
              onLoad={() => setIsLoaded(true)}
            />
          </video>
        </>
      ) : (
        <Image
          src={posterSrc}
          alt={alt}
          fill
          className="object-cover"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Play button overlay for videos */}
      {videoSrc && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
            <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
