import { NextResponse } from 'next/server';
import { getProducts, saveProducts, deleteProductItem } from '@/lib/db';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0'
};

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products, { headers: NO_CACHE_HEADERS });
}

export async function POST(request) {
  try {
    const newProduct = await request.json();
    const products = await getProducts();

    const created = {
      ...newProduct,
      id: newProduct.id || `prod-${Date.now()}`,
      features: Array.isArray(newProduct.features) ? newProduct.features : [],
      order: products.length + 1
    };

    products.push(created);
    await saveProducts(products);

    return NextResponse.json(created, { status: 201, headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function PUT(request) {
  try {
    const updatedProduct = await request.json();
    const products = await getProducts();

    const index = products.findIndex((p) => p.id === updatedProduct.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404, headers: NO_CACHE_HEADERS });
    }

    products[index] = {
      ...products[index],
      ...updatedProduct,
      features: Array.isArray(updatedProduct.features) ? updatedProduct.features : products[index].features
    };
    await saveProducts(products);

    return NextResponse.json(products[index], { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    await deleteProductItem(id);
    return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
