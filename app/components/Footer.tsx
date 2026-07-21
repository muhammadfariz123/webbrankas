// src/app/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-wider mb-3">
            GUARDIAN <span className="text-blue-500">SAFE</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Menyediakan brankas baru & second dengan kualitas terjamin untuk kebutuhan keamanan pribadi maupun usaha Anda.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">Kategori</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/?kategori=Brankas Baru" className="hover:text-white">Brankas Baru</Link></li>
            <li><Link href="/?kategori=Brankas Second" className="hover:text-white">Brankas Second</Link></li>
            <li><Link href="/kontak" className="hover:text-white">Kontak Kami</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">Hubungi Kami</h3>
          <p className="text-sm mb-3">0857-4144-4444</p>
          <a
            href="https://wa.me/6285741444444"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © 2026 Guardian Safe. All rights reserved.
      </div>
    </footer>
  );
}