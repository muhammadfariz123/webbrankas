// src/app/kontak/page.tsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <div className="bg-[#f8f9fa] py-10 px-4 md:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Hubungi Kami</h1>
          <p className="text-gray-500 text-sm mt-2">Konsultasi kebutuhan brankas Anda langsung via WhatsApp</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-2/3 bg-white border border-gray-200 rounded-2xl p-8 md:p-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Konsultasi Gratis</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            Punya pertanyaan soal ukuran, ketersediaan stok, atau ingin konsultasi brankas yang cocok untuk
            kebutuhan Anda? Tim kami siap membantu langsung lewat WhatsApp — respon cepat, tanpa antre.
          </p>

          <a
            href="https://wa.me/6285741444444?text=Halo%20Guardian%20Safe%2C%20saya%20ingin%20bertanya%20tentang%20produk%20brankas."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wide transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Chat WhatsApp Sekarang
          </a>
        </div>

        <div className="w-full md:w-1/3 bg-[#f8f9fa] border border-gray-200 rounded-2xl p-8">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">Info Kontak</h3>

          <div className="space-y-5 text-sm">
            <div>
              <p className="text-gray-400 text-xs uppercase mb-1">Telepon / WhatsApp</p>
              <p className="text-gray-900 font-semibold">0857-4144-4444</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase mb-1">Jam Operasional</p>
              <p className="text-gray-900 font-semibold">Senin – Sabtu, 08.00 – 17.00</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase mb-1">Layanan</p>
              <p className="text-gray-900 font-semibold">Brankas Baru & Second</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}