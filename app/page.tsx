// src/app/page.tsx
import prisma from '../app/lib/prisma';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductGrid from './components/ProductGrid';

// Cache homepage 60 detik — tapi otomatis di-refresh instan begitu ada
// perubahan produk/banner di admin (lihat revalidatePath di API routes)
export const revalidate = 60;

type Props = {
  searchParams: Promise<{ kategori?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  const bannerData = await prisma.banner.findFirst();
  const heroImageSrc = bannerData ? bannerData.image : '/image_730725.png';

  // Homepage cuma butuh 1 gambar per produk untuk kartu — halaman detail
  // tetap ambil semua gambar produk seperti biasa (tidak berubah)
  const productsForGrid = products.map((p) => ({
    ...p,
    images: p.images.length > 0 ? [p.images[0]] : [],
  }));

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      <div className="relative w-full h-[280px] md:h-[420px] bg-gray-900 overflow-hidden">
        <img
          src={heroImageSrc}
          alt="Guardian Safe Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Guardian Safe
          </h2>
          <p className="text-base md:text-2xl text-white/90 mt-3 tracking-wide">
            Hubungi: 0857-4144-4444
          </p>
          <a
            href="#produk"
            className="mt-6 bg-white text-gray-900 font-bold px-6 py-3 rounded-full text-sm hover:bg-blue-600 hover:text-white transition"
          >
            Lihat Produk
          </a>
        </div>
      </div>
      <ProductGrid products={productsForGrid} initialCategory={resolvedSearchParams.kategori ?? 'Semua'} />
      <Footer />
    </main>
  );
}