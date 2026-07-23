// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-16 bg-white border-b border-gray-100 animate-pulse" />
      <div className="w-full h-[280px] md:h-[420px] bg-gray-200 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}