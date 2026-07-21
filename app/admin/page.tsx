// src/app/admin/page.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminPanel() {
    // State untuk Produk
    const [formData, setFormData] = useState({
        name: '', price: '', category: 'Brankas Baru', height: '', length: '', width: '', weight: '', weightUnit: 'kg', image1: '', image2: ''
    });
    const [loadingProduct, setLoadingProduct] = useState(false);

    // State untuk Banner
    const [bannerImage, setBannerImage] = useState('');
    const [loadingBanner, setLoadingBanner] = useState(false);

    // Fungsi Global mengubah file ke Base64
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    // Handler Upload Gambar Banner
    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) return alert('Ukuran gambar maksimal 2MB.');
            const base64 = await convertToBase64(file);
            setBannerImage(base64);
        }
    };

    // Handler Upload Gambar Produk
    const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image1' | 'image2') => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) return alert('Ukuran gambar maksimal 2MB.');
            const base64 = await convertToBase64(file);
            setFormData({ ...formData, [field]: base64 });
        }
    };

    // Submit Banner
    const submitBanner = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bannerImage) return alert('Pilih gambar banner terlebih dahulu!');

        setLoadingBanner(true);
        const res = await fetch('/api/banner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: bannerImage })
        });

        if (res.ok) alert('Banner berhasil diupdate!');
        else alert('Gagal update banner');
        setLoadingBanner(false);
    };

    // Submit Produk
    const submitProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image1) return alert('Gambar utama produk wajib diunggah!');

        setLoadingProduct(true);
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            alert('Produk berhasil ditambahkan!');
            setFormData({ name: '', price: '', category: 'Brankas Baru', height: '', length: '', width: '', weight: '', weightUnit: 'kg', image1: '', image2: '' });
        } else {
            alert('Gagal menambahkan produk');
        }
        setLoadingProduct(false);
    };

    const inputClass = "w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-800 focus:border-gray-800 outline-none transition-colors";
    const labelClass = "block text-sm font-semibold text-gray-700";

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Header Navigation */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Panel</h1>
                    <Link href="/">
                        <button className="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-colors shadow-sm">
                            Lihat Website
                        </button>
                    </Link>
                </div>

                {/* SECTION 1: UPLOAD BANNER */}
                <div className="bg-white p-8 sm:p-10 shadow-lg shadow-gray-200/50 rounded-2xl border border-gray-100">
                    <div className="mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold text-gray-900">Ubah Banner Utama</h2>
                        <p className="text-sm text-gray-500 mt-1">Ganti gambar banner besar yang tampil di halaman depan website.</p>
                    </div>

                    <form onSubmit={submitBanner} className="space-y-4">
                        <div>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                onChange={handleBannerUpload}
                            />
                            {bannerImage && (
                                <div className="mt-4">
                                    <p className="text-xs text-gray-500 mb-1">Preview Banner:</p>
                                    <img src={bannerImage} alt="Banner Preview" className="w-full h-40 object-cover rounded-lg border shadow-sm" />
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={loadingBanner}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-bold transition-all shadow-md disabled:bg-gray-400"
                        >
                            {loadingBanner ? 'Menyimpan Banner...' : 'Simpan Banner'}
                        </button>
                    </form>
                </div>

                {/* SECTION 2: UPLOAD PRODUK (Form lama yang sudah Anda rapikan) */}
                <div className="bg-white p-8 sm:p-10 shadow-lg shadow-gray-200/50 rounded-2xl border border-gray-100">
                    <div className="mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold text-gray-900">Tambah Produk Baru</h2>
                        <p className="text-sm text-gray-500 mt-1">Masukkan data spesifikasi brankas baru ke dalam katalog.</p>
                    </div>

                    <form onSubmit={submitProduct} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className={labelClass}>Nama Produk</label><input required type="text" className={inputClass} placeholder="Contoh: Guardian Safe UK60" onChange={e => setFormData({ ...formData, name: e.target.value })} value={formData.name} /></div>
                            <div>
                                <label className={labelClass}>Kategori</label>
                                <select className={inputClass} onChange={e => setFormData({ ...formData, category: e.target.value })} value={formData.category}>
                                    <option value="Brankas Baru">Brankas Baru</option>
                                    <option value="Brankas Second">Brankas Second</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Harga (Rp)</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><span className="text-gray-500 font-semibold">Rp</span></div>
                                <input required type="number" className={`${inputClass} pl-12`} placeholder="5900000" onChange={e => setFormData({ ...formData, price: e.target.value })} value={formData.price} />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Spesifikasi Fisik</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div><label className={labelClass}>Tinggi (cm)</label><input required type="number" className={inputClass} placeholder="60" onChange={e => setFormData({ ...formData, height: e.target.value })} value={formData.height} /></div>
                                <div><label className={labelClass}>Panjang (cm)</label><input required type="number" className={inputClass} placeholder="52" onChange={e => setFormData({ ...formData, length: e.target.value })} value={formData.length} /></div>
                                <div><label className={labelClass}>Lebar (cm)</label><input required type="number" className={inputClass} placeholder="58" onChange={e => setFormData({ ...formData, width: e.target.value })} value={formData.width} /></div>
                                <div>
                  <label className={labelClass}>Berat</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      required
                      type="number"
                      className={`${inputClass} mt-0`}
                      placeholder="250"
                      onChange={e => setFormData({...formData, weight: e.target.value})}
                      value={formData.weight}
                    />
                    <select
                      className={`${inputClass} mt-0 w-24 shrink-0`}
                      onChange={e => setFormData({...formData, weightUnit: e.target.value})}
                      value={formData.weightUnit}
                    >
                      <option value="kg">kg</option>
                      <option value="ton">ton</option>
                    </select>
                  </div>
                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-6">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Upload Gambar Produk</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Gambar Utama <span className="text-red-500">*</span></label>
                                    <input required={!formData.image1} type="file" accept="image/png, image/jpeg, image/jpg, image/webp" className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" onChange={(e) => handleProductImageUpload(e, 'image1')} />
                                    {formData.image1 && <img src={formData.image1} alt="Preview 1" className="mt-4 w-full h-40 object-cover rounded-lg border shadow-sm" />}
                                </div>
                                <div>
                                    <label className={labelClass}>Gambar Kedua <span className="text-gray-400 font-normal">(Opsional)</span></label>
                                    <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" onChange={(e) => handleProductImageUpload(e, 'image2')} />
                                    {formData.image2 && <img src={formData.image2} alt="Preview 2" className="mt-4 w-full h-40 object-cover rounded-lg border shadow-sm" />}
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={loadingProduct} className="w-full bg-gray-900 hover:bg-gray-800 text-white p-4 rounded-xl font-bold text-lg transition-all shadow-md disabled:bg-gray-400">
                            {loadingProduct ? 'Menyimpan Produk...' : 'Simpan Produk'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}