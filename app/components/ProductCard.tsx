// src/app/components/ProductCard.tsx
import Link from 'next/link';
import { Product } from '@prisma/client';

export default function ProductCard({ product }: { product: Product }) {
  const mainImage = product.images[0];
  return (
    <Link href={`/produk/${product.id}`} className="group block">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col h-full">
        <div className="relative w-full h-48 md:h-56 bg-[#f4f4f4] flex items-center justify-center p-4 overflow-hidden">
          <span
            className={`absolute top-3 left-3 z-10 text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
              product.category === 'Brankas Baru'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-orange-100 text-orange-700'
            }`}
          >
            {product.category === 'Brankas Baru' ? 'Baru' : 'Second'}
          </span>
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-xs text-gray-400">Tidak ada gambar</span>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gray-900/90 text-white px-4 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <p className="text-[11px] text-gray-200 leading-relaxed mb-2">
              T{product.height}×P{product.length}×L{product.width} cm &middot; ±{product.weight} {product.weightUnit}
            </p>
            <span className="inline-block text-[11px] font-bold uppercase tracking-wide border border-white/40 rounded-full px-3 py-1 group-hover:bg-white group-hover:text-gray-900 transition">
              Lihat Detail
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h4 className="text-sm font-bold text-gray-800 mb-1 line-clamp-2">{product.name}</h4>
          <p className="text-xs text-gray-400 mb-3">
            T{product.height} × P{product.length} × L{product.width} cm
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-red-600 font-extrabold text-base">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            <span className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
              Detail →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}