"use client";

import React from "react";
import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
}

interface CardCarouselProps {
  images: CarouselImage[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export function CardCarousel({
  images,
  showNavigation = true,
  showPagination = true,
}: CardCarouselProps) {
  const [current, setCurrent] = React.useState(0);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="relative aspect-video w-full">
        {images[current] && (
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>

      {showNavigation && images.length > 1 && (
        <div className="flex gap-2 justify-center mt-4">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            aria-label="Previous image"
            className="px-3 py-1 rounded bg-zinc-800 text-white text-sm"
          >
            ←
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(images.length - 1, c + 1))}
            aria-label="Next image"
            className="px-3 py-1 rounded bg-zinc-800 text-white text-sm"
          >
            →
          </button>
        </div>
      )}

      {showPagination && (
        <div className="flex gap-1.5 justify-center mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-orange-500 w-4" : "bg-zinc-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
