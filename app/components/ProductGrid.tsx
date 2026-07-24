// src/app/components/ProductGrid.tsx
'use client';
import { useState, useMemo, useEffect } from 'react';
import { Product } from '@prisma/client';
import ProductCard from './ProductCard';

const TABS = ['Semua', 'Brankas Baru', 'Brankas Second'];

const PRICE_RANGES = [
  { label: 'Semua Harga', min: 0, max: Infinity },
  { label: '< Rp 1 Juta', min: 0, max: 1_000_000 },
  { label: 'Rp 1 - 3 Juta', min: 1_000_000, max: 3_000_000 },
  { label: 'Rp 3 - 5 Juta', min: 3_000_000, max: 5_000_000 },
  { label: 'Rp 5 - 10 Juta', min: 5_000_000, max: 10_000_000 },
  { label: '> Rp 10 Juta', min: 10_000_000, max: Infinity },
];

// Hanya menerima digit, untuk input harga custom
const onlyDigits = (value: string) => value.replace(/[^0-9]/g, '');

export default function ProductGrid({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory: string;
}) {
  const [activeCategory, setActiveCategory] = useState(
    TABS.includes(initialCategory) ? initialCategory : 'Semua'
  );
  const [activePriceRange, setActivePriceRange] = useState(0);
  const [customMin, setCustomMin] = useState('');
  const [customMax, setCustomMax] = useState('');
  const [useCustomRange, setUseCustomRange] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  // Sinkronkan ulang activeCategory setiap kali prop initialCategory berubah
  // (misal user klik link kategori dari Navbar saat sudah berada di halaman ini)
  useEffect(() => {
    setActiveCategory(TABS.includes(initialCategory) ? initialCategory : 'Semua');
  }, [initialCategory]);

  const filtered = useMemo(() => {
    let result = products;

    if (activeCategory !== 'Semua') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (useCustomRange) {
      const min = customMin ? parseInt(customMin, 10) : 0;
      const max = customMax ? parseInt(customMax, 10) : Infinity;
      result = result.filter((p) => p.price >= min && p.price <= max);
    } else {
      const range = PRICE_RANGES[activePriceRange];
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    return result;
  }, [products, activeCategory, activePriceRange, useCustomRange, customMin, customMax]);

  const applyCustomRange = () => {
    if (!customMin && !customMax) return;
    setUseCustomRange(true);
  };

  const resetPriceFilter = () => {
    setUseCustomRange(false);
    setActivePriceRange(0);
    setCustomMin('');
    setCustomMax('');
  };

  const isPriceFilterActive = useCustomRange || activePriceRange !== 0;

  return (
    <section id="produk" className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Produk Kami</h3>
        <p className="text-gray-500 text-sm mt-2">Pilihan brankas baru & second, siap kirim ke lokasi Anda</p>
      </div>

      {/* Tabs Kategori */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`px-5 py-2 rounded-full text-sm font-bold border transition ${
              activeCategory === tab
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter Harga */}
      <div className="max-w-2xl mx-auto mb-10">
        <button
          onClick={() => setShowPriceFilter(!showPriceFilter)}
          className="w-full flex items-center justify-between px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-gray-400 transition"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Harga
            {isPriceFilterActive && (
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Aktif
              </span>
            )}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${showPriceFilter ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showPriceFilter && (
          <div className="mt-3 p-5 bg-white border border-gray-200 rounded-xl space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Pilihan Cepat</p>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map((range, idx) => (
                  <button
                    key={range.label}
                    onClick={() => {
                      setActivePriceRange(idx);
                      setUseCustomRange(false);
                      setCustomMin('');
                      setCustomMax('');
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                      !useCustomRange && activePriceRange === idx
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Atau Masukkan Rentang Sendiri</p>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-3 flex items-center text-xs text-gray-400 font-semibold">Rp</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Minimal"
                    value={customMin}
                    onChange={(e) => setCustomMin(onlyDigits(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-gray-800 focus:ring-1 focus:ring-gray-800 outline-none"
                  />
                </div>
                <span className="text-gray-400 text-sm">—</span>
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-3 flex items-center text-xs text-gray-400 font-semibold">Rp</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Maksimal"
                    value={customMax}
                    onChange={(e) => setCustomMax(onlyDigits(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-gray-800 focus:ring-1 focus:ring-gray-800 outline-none"
                  />
                </div>
                <button
                  onClick={applyCustomRange}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-lg transition shrink-0"
                >
                  Terapkan
                </button>
              </div>
            </div>

            {isPriceFilterActive && (
              <button
                onClick={resetPriceFilter}
                className="text-xs font-semibold text-red-600 hover:text-red-700"
              >
                Reset Filter Harga
              </button>
            )}
          </div>
        )}
      </div>

      {/* Grid Produk */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          Tidak ada produk yang sesuai dengan filter yang dipilih.
        </p>
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