// src/app/produk/[id]/page.tsx
import { notFound } from 'next/navigation';
import prisma from '../../lib/prisma';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import ProductGallery from '../../components/ProductGallery';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetail({ params }: Props) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) return notFound();

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: productId },
    },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  const waNumber = '6285741444444';
  const message = `Halo Guardian Safe, saya tertarik dengan produk *${product.name}* (${product.category}).\n\nHarga: Rp ${product.price.toLocaleString('id-ID')}\nUkuran: T:${product.height}cm P:${product.length}cm L:${product.width}cm\nBerat: ±${product.weight} ${product.weightUnit}\n\nApakah stoknya masih tersedia?`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar />
      <div className="bg-[#f8f9fa] py-4 px-4 md:px-8 text-sm text-gray-500 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex gap-2">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <span className="text-gray-400">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-[38%] flex flex-col">
          <ProductGallery images={product.images} name={product.name} />
          <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 mt-6 p-6 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Harga</p>
            <h2 className="text-3xl font-extrabold text-red-600 tracking-tight">
              Rp {product.price.toLocaleString('id-ID')},-
            </h2>
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-6">
            <button className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold py-4 text-sm tracking-widest uppercase transition-colors shadow-sm flex justify-center items-center gap-2 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Chat WhatsApp
            </button>
          </a>
        </div>
        <div className="w-full md:w-[62%] bg-white border border-gray-200 rounded-xl p-8 self-start">
          <span
            className={`inline-block text-[10px] font-bold uppercase px-2 py-1 rounded-full mb-3 ${
              product.category === 'Brankas Baru' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
            }`}
          >
            {product.category}
          </span>
          <h1 className="text-2xl font-extrabold uppercase text-gray-900 mb-6">{product.name}</h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            Brankas berkualitas dengan spesifikasi presisi untuk memenuhi kebutuhan keamanan optimal Anda.
            Hubungi kami melalui WhatsApp untuk informasi ketersediaan stok terbaru.
          </p>
          <div className="flex flex-col border-t border-gray-200 text-sm">
            <div className="flex py-4 border-b border-gray-100">
              <span className="w-1/3 font-bold text-gray-800">Kategori</span>
              <span className="w-2/3 text-gray-600">{product.category}</span>
            </div>
            <div className="flex py-4 border-b border-gray-100">
              <span className="w-1/3 font-bold text-gray-800">Ukuran</span>
              <span className="w-2/3 text-gray-600">
                T: {product.height} cm &nbsp;|&nbsp; P: {product.length} cm &nbsp;|&nbsp; L: {product.width} cm
              </span>
            </div>
            <div className="flex py-4 border-b border-gray-100">
              <span className="w-1/3 font-bold text-gray-800">Berat</span>
              <span className="w-2/3 text-gray-600">± {product.weight} {product.weightUnit}</span>
            </div>
            <div className="flex py-4 border-b border-gray-100">
              <span className="w-1/3 font-bold text-gray-800">Kondisi</span>
              <span className="w-2/3 text-gray-600">
                {product.category === 'Brankas Baru' ? 'Baru (New)' : 'Second / Bekas'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16 border-t border-gray-100 pt-12">
          <h3 className="text-xl font-extrabold text-gray-900 mb-6">Produk Relevan</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((rp) => (
              <ProductCard product={rp} key={rp.id} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}