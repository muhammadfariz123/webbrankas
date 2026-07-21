// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const product = await prisma.product.create({
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
}