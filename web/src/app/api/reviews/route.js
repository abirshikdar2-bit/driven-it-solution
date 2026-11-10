import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'reviews.json');

function getReviews() {
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading reviews:', error);
    return [];
  }
}

function saveReviews(reviews) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(reviews, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving reviews:', error);
    return false;
  }
}

export async function GET() {
  const reviews = getReviews();
  return NextResponse.json(reviews);
}

export async function POST(request) {
  try {
    const newReview = await request.json();
    const reviews = getReviews();

    const created = {
      ...newReview,
      id: newReview.id || `rev-${Date.now()}`,
      rating: Number(newReview.rating) || 5
    };

    reviews.push(created);
    saveReviews(reviews);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedReview = await request.json();
    const reviews = getReviews();

    const index = reviews.findIndex((r) => r.id === updatedReview.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    reviews[index] = { ...reviews[index], ...updatedReview };
    saveReviews(reviews);

    return NextResponse.json(reviews[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    let reviews = getReviews();
    reviews = reviews.filter((r) => r.id !== id);
    saveReviews(reviews);

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
