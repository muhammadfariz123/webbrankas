// scripts/migrate-images.mjs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  for (const p of products) {
    const images = [p.image1, p.image2].filter(Boolean);
    await prisma.product.update({
      where: { id: p.id },
      data: { images },
    });
    console.log(`Produk #${p.id} (${p.name}) -> ${images.length} gambar dipindah`);
  }
  console.log(`Selesai. Total ${products.length} produk diproses.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());