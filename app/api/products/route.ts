// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

// Mengambil semua produk
export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(products);
}

// Menambahkan produk baru (Dari Panel Admin)
export async function POST(request: Request) {
  const body = await request.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: parseInt(body.price),
      category: body.category,
      height: parseInt(body.height),
      length: parseInt(body.length),
      width: parseInt(body.width),
      weight: parseInt(body.weight),
      image1: body.image1,
      image2: body.image2 || null,
    },
  });
  return NextResponse.json(product);
}