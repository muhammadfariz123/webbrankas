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
                <Link href="/" className="cursor-pointer">
                    <h1 className="text-xl md:text-2xl font-extrabold tracking-wider text-gray-900">
                        GUARDIAN <span className="text-blue-600">SAFE</span>
                    </h1>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-700">
                    <Link href="/" className="hover:text-blue-600 transition cursor-pointer">HOME</Link>

                    <div
                        className="relative"
                        onMouseEnter={() => setKategoriOpen(true)}
                        onMouseLeave={() => setKategoriOpen(false)}
                    >
                        <button className="hover:text-blue-600 transition cursor-pointer py-2">KATEGORI</button>

                        {kategoriOpen && (
                            // padding-top di sini menjadi "jembatan" tak kasat mata yang menyambung
                            // area hover tombol ke dropdown, jadi kursor tidak pernah keluar area hover
                            <div className="absolute top-full left-0 pt-2 w-48">
                                <div className="bg-white shadow-lg rounded-lg border border-gray-100 py-2">
                                    <Link
                                        href="/?kategori=Brankas Baru#produk"
                                        className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                                    >
                                        Brankas Baru
                                    </Link>
                                    <Link
                                        href="/?kategori=Brankas Second#produk"
                                        className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                                    >
                                        Brankas Second
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/kontak" className="hover:text-blue-600 transition cursor-pointer">KONTAK</Link>
                    <a
                        href="https://wa.me/6285741444444"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition cursor-pointer"
                    >
                        Chat WA
                    </a>
                </div>

                <button className="md:hidden cursor-pointer" onClick={() => setOpen(!open)} aria-label="Menu">
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
                    <Link href="/" className="block cursor-pointer" onClick={() => setOpen(false)}>HOME</Link>
                    <Link href="/?kategori=Brankas Baru#produk" className="block cursor-pointer" onClick={() => setOpen(false)}>BRANKAS BARU</Link>
                    <Link href="/?kategori=Brankas Second#produk" className="block cursor-pointer" onClick={() => setOpen(false)}>BRANKAS SECOND</Link>
                    <Link href="/kontak" className="block cursor-pointer" onClick={() => setOpen(false)}>KONTAK</Link>
                </div>
            )}
        </nav>
    );
}