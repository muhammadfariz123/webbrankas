// src/app/api/banner/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Cari apakah banner sudah ada. 
    const existingBanner = await prisma.banner.findFirst();
    
    let banner;
    if (existingBanner) {
      // Jika ada, perbarui data gambar yang lama
      banner = await prisma.banner.update({
        where: { id: existingBanner.id },
        data: { image: body.image },
      });
    } else {
      // Jika belum ada sama sekali, buat baru
      banner = await prisma.banner.create({
        data: { image: body.image },
      });
    }
    
    return NextResponse.json(banner, { status: 200 });
  } catch (error) {
    console.error("Terjadi kesalahan saat menyimpan banner:", error);
    return NextResponse.json({ error: "Gagal menyimpan banner" }, { status: 500 });
  }
}