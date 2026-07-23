// src/app/produk/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-16 bg-white border-b border-gray-100 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-[38%] h-80 md:h-96 bg-gray-200 rounded-xl animate-pulse" />
        <div className="w-full md:w-[62%] h-80 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}