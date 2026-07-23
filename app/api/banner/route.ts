// src/app/api/banner/route.ts
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const existingBanner = await prisma.banner.findFirst();

    let banner;
    if (existingBanner) {
      banner = await prisma.banner.update({
        where: { id: existingBanner.id },
        data: { image: body.image },
      });
    } else {
      banner = await prisma.banner.create({
        data: { image: body.image },
      });
    }

    // Refresh cache homepage begitu banner diganti
    revalidatePath('/');

    return NextResponse.json(banner, { status: 200 });
  } catch (error) {
    console.error("Terjadi kesalahan saat menyimpan banner:", error);
    return NextResponse.json({ error: "Gagal menyimpan banner" }, { status: 500 });
  }
}