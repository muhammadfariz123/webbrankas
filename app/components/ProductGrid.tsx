// src/app/components/ProductGrid.tsx
'use client';
import { useState } from 'react';
import { Product } from '@prisma/client';
import ProductCard from './ProductCard';

const TABS = ['Semua', 'Brankas Baru', 'Brankas Second'];

export default function ProductGrid({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory: string;
}) {
  const [active, setActive] = useState(
    TABS.includes(initialCategory) ? initialCategory : 'Semua'
  );

  const filtered =
    active === 'Semua' ? products : products.filter((p) => p.category === active);

  return (
    <section id="produk" className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Produk Kami</h3>
        <p className="text-gray-500 text-sm mt-2">Pilihan brankas baru & second, siap kirim ke lokasi Anda</p>
      </div>

      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-5 py-2 rounded-full text-sm font-bold border transition ${
              active === tab
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-16">Belum ada produk pada kategori ini.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </section>
  );
}