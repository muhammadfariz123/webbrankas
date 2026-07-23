// src/app/components/ProductGallery.tsx
'use client';
import { useState, useRef } from 'react';

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const activeImage = images[activeIndex] ?? images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  if (!activeImage) {
    return (
      <div className="bg-[#f4f4f4] rounded-xl h-80 md:h-96 flex items-center justify-center border border-gray-100 text-gray-400 text-sm">
        Belum ada gambar
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        className="relative bg-[#f4f4f4] rounded-xl h-80 md:h-96 flex items-center justify-center p-8 border border-gray-100 overflow-hidden cursor-zoom-in"
      >
        <img
          src={activeImage}
          alt={name}
          loading="eager"
          decoding="async"
          className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply pointer-events-none"
        />
        {isZooming && (
          <div
            className="hidden md:block absolute w-40 h-40 rounded-full border-2 border-white shadow-2xl pointer-events-none"
            style={{
              left: `${zoomPosition.x}%`,
              top: `${zoomPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              backgroundImage: `url(${activeImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '250% 250%',
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundColor: '#f4f4f4',
            }}
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 flex-wrap">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-20 h-20 bg-[#f4f4f4] rounded-lg border p-2 flex items-center justify-center overflow-hidden transition ${
                idx === activeIndex
                  ? 'border-gray-900 opacity-100'
                  : 'border-gray-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${name} - ${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}