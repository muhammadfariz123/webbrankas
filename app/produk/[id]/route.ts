// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (!product) {
    return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: {
        name: body.name,
        price: parseInt(body.price, 10),
        category: body.category,
        height: parseInt(body.height, 10),
        length: parseInt(body.length, 10),
        width: parseInt(body.width, 10),
        weight: parseInt(body.weight, 10),
        weightUnit: body.weightUnit || 'kg',
        images: body.images || [],
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal memperbarui produk' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menghapus produk' }, { status: 500 });
  }
}