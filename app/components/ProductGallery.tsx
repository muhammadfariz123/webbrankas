// src/app/components/ProductGallery.tsx
'use client';
import { useState, useRef } from 'react';

export default function ProductGallery({
  image1,
  image2,
  name,
}: {
  image1: string;
  image2: string | null;
  name: string;
}) {
  const [activeImage, setActiveImage] = useState(image1);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

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
          className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply pointer-events-none"
        />

        {/* Lensa kaca pembesar bulat */}
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

      {image2 && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveImage(image1)}
            className={`w-20 h-20 bg-[#f4f4f4] rounded-lg border p-2 flex items-center justify-center overflow-hidden transition ${
              activeImage === image1
                ? 'border-gray-900 opacity-100'
                : 'border-gray-200 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={image1} alt="Thumb 1" className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply" />
          </button>

          <button
            onClick={() => setActiveImage(image2)}
            className={`w-20 h-20 bg-[#f4f4f4] rounded-lg border p-2 flex items-center justify-center overflow-hidden transition ${
              activeImage === image2
                ? 'border-gray-900 opacity-100'
                : 'border-gray-200 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={image2} alt="Thumb 2" className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply" />
          </button>
        </div>
      )}
    </>
  );
}