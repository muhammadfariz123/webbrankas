// src/app/components/Navbar.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [kategoriOpen, setKategoriOpen] = useState(false);

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
                <Link href="/">
                    <h1 className="text-xl md:text-2xl font-extrabold tracking-wider text-gray-900">
                        GUARDIAN <span className="text-blue-600">SAFE</span>
                    </h1>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-700">
                    <Link href="/" className="hover:text-blue-600 transition">HOME</Link>

                    <div
                        className="relative"
                        onMouseEnter={() => setKategoriOpen(true)}
                        onMouseLeave={() => setKategoriOpen(false)}
                    >
                        <button className="hover:text-blue-600 transition">KATEGORI</button>
                        {kategoriOpen && (
                            <div className="absolute top-6 left-0 bg-white shadow-lg rounded-lg border border-gray-100 py-2 w-48">
                                <Link href="/?kategori=Brankas Baru#produk" className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                                    Brankas Baru
                                </Link>
                                <Link href="/?kategori=Brankas Second#produk" className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                                    Brankas Second
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href="/kontak" className="hover:text-blue-600 transition">KONTAK</Link>

                    <a
                        href="https://wa.me/6285741444444"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition"
                    >
                        Chat WA
                    </a>
                </div>

                <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
                    <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {open ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {open && (
                <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 text-sm font-bold text-gray-700">
                    <Link href="/" className="block" onClick={() => setOpen(false)}>HOME</Link>
                    <Link href="/?kategori=Brankas Baru#produk" className="block" onClick={() => setOpen(false)}>BRANKAS BARU</Link>
                    <Link href="/?kategori=Brankas Second#produk" className="block" onClick={() => setOpen(false)}>BRANKAS SECOND</Link>
                    <Link href="/kontak" className="block" onClick={() => setOpen(false)}>KONTAK</Link>
                </div>
            )}
        </nav>
    );
}