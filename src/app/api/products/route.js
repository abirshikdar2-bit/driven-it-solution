import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

function getProducts() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

function saveProducts(products) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving products:', error);
    return false;
  }
}

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    const newProduct = await request.json();
    const products = getProducts();

    const created = {
      ...newProduct,
      id: newProduct.id || `prod-${Date.now()}`,
      features: Array.isArray(newProduct.features) ? newProduct.features : [],
      order: products.length + 1
    };

    products.push(created);
    saveProducts(products);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedProduct = await request.json();
    const products = getProducts();

    const index = products.findIndex((p) => p.id === updatedProduct.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    products[index] = {
      ...products[index],
      ...updatedProduct,
      features: Array.isArray(updatedProduct.features) ? updatedProduct.features : products[index].features
    };
    saveProducts(products);

    return NextResponse.json(products[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    let products = getProducts();
    const originalLength = products.length;
    products = products.filter((p) => p.id !== id);

    if (products.length === originalLength) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    saveProducts(products);
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
