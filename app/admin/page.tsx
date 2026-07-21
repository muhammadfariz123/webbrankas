// src/app/admin/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type ProductItem = {
    id: number;
    name: string;
    price: number;
    category: string;
    height: number;
    length: number;
    width: number;
    weight: number;
    weightUnit: string;
    images: string[];
};

const emptyForm = {
    name: '',
    price: '',
    category: 'Brankas Baru',
    height: '',
    length: '',
    width: '',
    weight: '',
    weightUnit: 'kg',
    images: [] as string[],
};

// Hanya menerima digit — mencegah nilai berubah sendiri (scroll/spinner) & memastikan
// apa yang diketik = apa yang tersimpan
const onlyDigits = (value: string) => value.replace(/[^0-9]/g, '');
// Untuk berat: boleh digit + SATU tanda desimal (titik atau koma), misal "1.5" atau "1,5"
const onlyDecimal = (value: string) => {
    let v = value.replace(/[^0-9.,]/g, '');
    const sepIndex = v.search(/[.,]/);
    if (sepIndex !== -1) {
        const before = v.slice(0, sepIndex + 1);
        const after = v.slice(sepIndex + 1).replace(/[.,]/g, '');
        v = before + after;
    }
    return v;
};
export default function AdminPanel() {
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loadingProduct, setLoadingProduct] = useState(false);

    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loadingList, setLoadingList] = useState(true);

    const [bannerImage, setBannerImage] = useState('');
    const [loadingBanner, setLoadingBanner] = useState(false);

    const fetchProducts = async () => {
        setLoadingList(true);
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch {
            alert('Gagal memuat daftar produk');
        }
        setLoadingList(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) return alert('Ukuran gambar maksimal 2MB.');
            const base64 = await convertToBase64(file);
            setBannerImage(base64);
        }
    };

    // Upload banyak gambar sekaligus
    const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const newImages: string[] = [];
        for (const file of Array.from(files)) {
            if (file.size > 2 * 1024 * 1024) {
                alert(`${file.name} dilewati karena melebihi 2MB.`);
                continue;
            }
            const base64 = await convertToBase64(file);
            newImages.push(base64);
        }
        setFormData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
        e.target.value = '';
    };

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const submitBanner = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bannerImage) return alert('Pilih gambar banner terlebih dahulu!');
        setLoadingBanner(true);
        const res = await fetch('/api/banner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: bannerImage }),
        });
        if (res.ok) alert('Banner berhasil diupdate!');
        else alert('Gagal update banner');
        setLoadingBanner(false);
    };
    const submitProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.images.length === 0) return alert('Minimal 1 gambar produk wajib diunggah!');
        setLoadingProduct(true);
        const url = editingId ? `/api/products/${editingId}` : '/api/products';
        const method = editingId ? 'PUT' : 'POST';
        const payload = { ...formData, weight: formData.weight.replace(',', '.') };
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            alert(editingId ? 'Produk berhasil diperbarui!' : 'Produk berhasil ditambahkan!');
            setFormData(emptyForm);
            setEditingId(null);
            fetchProducts();
        } else {
            alert('Gagal menyimpan produk');
        }
        setLoadingProduct(false);
    };

    const startEdit = (product: ProductItem) => {
        setEditingId(product.id);
        setFormData({
            name: product.name,
            price: String(product.price),
            category: product.category,
            height: String(product.height),
            length: String(product.length),
            width: String(product.width),
            weight: String(product.weight),
            weightUnit: product.weightUnit,
            images: product.images,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData(emptyForm);
    };

    const deleteProduct = async (id: number) => {
        if (!confirm('Yakin ingin menghapus produk ini? Tindakan ini tidak bisa dibatalkan.')) return;
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchProducts();
            if (editingId === id) cancelEdit();
        } else {
            alert('Gagal menghapus produk');
        }
    };

    const inputClass =
        'w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-800 focus:border-gray-800 outline-none transition-colors';
    const labelClass = 'block text-sm font-semibold text-gray-700';

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Panel</h1>
                    <Link href="/">
                        <button className="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-colors shadow-sm">
                            Lihat Website
                        </button>
                    </Link>
                </div>

                {/* SECTION 1: BANNER */}
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

                {/* SECTION 2: FORM PRODUK (Tambah / Edit) */}
                <div className="bg-white p-8 sm:p-10 shadow-lg shadow-gray-200/50 rounded-2xl border border-gray-100">
                    <div className="mb-6 border-b pb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {editingId ? `Mengubah produk #${editingId}.` : 'Masukkan data spesifikasi brankas baru ke dalam katalog.'}
                            </p>
                        </div>
                        {editingId && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Batal Edit
                            </button>
                        )}
                    </div>

                    <form onSubmit={submitProduct} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Nama Produk</label>
                                <input
                                    required
                                    type="text"
                                    className={inputClass}
                                    placeholder="Contoh: Guardian Safe UK60"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    value={formData.name}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Kategori</label>
                                <select
                                    className={inputClass}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    value={formData.category}
                                >
                                    <option value="Brankas Baru">Brankas Baru</option>
                                    <option value="Brankas Second">Brankas Second</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Harga (Rp)</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-gray-500 font-semibold">Rp</span>
                                </div>
                                <input
                                    required
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className={`${inputClass} pl-12`}
                                    placeholder="5900000"
                                    onChange={(e) => setFormData({ ...formData, price: onlyDigits(e.target.value) })}
                                    value={formData.price}
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-5">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Spesifikasi Fisik</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className={labelClass}>Tinggi (cm)</label>
                                    <input
                                        required
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className={inputClass}
                                        placeholder="60"
                                        onChange={(e) => setFormData({ ...formData, height: onlyDigits(e.target.value) })}
                                        value={formData.height}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Panjang (cm)</label>
                                    <input
                                        required
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className={inputClass}
                                        placeholder="52"
                                        onChange={(e) => setFormData({ ...formData, length: onlyDigits(e.target.value) })}
                                        value={formData.length}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Lebar (cm)</label>
                                    <input
                                        required
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className={inputClass}
                                        placeholder="58"
                                        onChange={(e) => setFormData({ ...formData, width: onlyDigits(e.target.value) })}
                                        value={formData.width}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Berat</label>
                                <div className="flex gap-3 mt-1">
                                    <div className="flex-1">
                                        <input
                                            required
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-800 focus:border-gray-800 outline-none transition-colors"
                                            placeholder="250 atau 1,5"
                                            onChange={(e) => setFormData({ ...formData, weight: onlyDecimal(e.target.value) })}
                                            value={formData.weight}
                                        />
                                    </div>
                                    <div className="w-32 shrink-0">
                                        <select
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-800 focus:border-gray-800 outline-none transition-colors"
                                            onChange={(e) => setFormData({ ...formData, weightUnit: e.target.value })}
                                            value={formData.weightUnit}
                                        >
                                            <option value="kg">Kg</option>
                                            <option value="ton">Ton</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                                Gambar Produk <span className="text-red-500">*</span>
                            </h3>
                            <p className="text-xs text-gray-500">Bisa pilih beberapa file gambar sekaligus (maks 2MB per gambar).</p>
                            <input
                                type="file"
                                multiple
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                                onChange={handleImagesUpload}
                            />
                            {formData.images.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="relative group">
                                            <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded-lg border shadow-sm" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow"
                                                aria-label="Hapus gambar"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loadingProduct}
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white p-4 rounded-xl font-bold text-lg transition-all shadow-md disabled:bg-gray-400"
                        >
                            {loadingProduct
                                ? 'Menyimpan...'
                                : editingId
                                    ? 'Update Produk'
                                    : 'Simpan Produk'}
                        </button>
                    </form>
                </div>

                {/* SECTION 3: DAFTAR PRODUK (Edit / Hapus) */}
                <div className="bg-white p-8 sm:p-10 shadow-lg shadow-gray-200/50 rounded-2xl border border-gray-100">
                    <div className="mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold text-gray-900">Daftar Produk</h2>
                        <p className="text-sm text-gray-500 mt-1">Kelola produk yang sudah ditambahkan ke katalog.</p>
                    </div>

                    {loadingList ? (
                        <p className="text-sm text-gray-500 py-6 text-center">Memuat produk...</p>
                    ) : products.length === 0 ? (
                        <p className="text-sm text-gray-500 py-6 text-center">Belum ada produk.</p>
                    ) : (
                        <div className="space-y-3">
                            {products.map((p) => (
                                <div
                                    key={p.id}
                                    className="flex items-center gap-4 border border-gray-200 rounded-xl p-3"
                                >
                                    <div className="w-16 h-16 bg-[#f4f4f4] rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                        {p.images[0] ? (
                                            <img src={p.images[0]} alt={p.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                        ) : (
                                            <span className="text-[10px] text-gray-400">No image</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-800 truncate">{p.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {p.category} &middot; Rp {p.price.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => startEdit(p)}
                                            className="px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(p.id)}
                                            className="px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}