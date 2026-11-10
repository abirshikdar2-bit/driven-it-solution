import { NextResponse } from 'next/server';
import { getReviews, saveReviews, deleteReviewItem } from '@/lib/db';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0'
};

export async function GET() {
  const reviews = await getReviews();
  return NextResponse.json(reviews, { headers: NO_CACHE_HEADERS });
}

export async function POST(request) {
  try {
    const newReview = await request.json();
    const reviews = await getReviews();

    const created = {
      ...newReview,
      id: newReview.id || `rev-${Date.now()}`,
      rating: Number(newReview.rating) || 5
    };

    reviews.push(created);
    await saveReviews(reviews);

    return NextResponse.json(created, { status: 201, headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function PUT(request) {
  try {
    const updatedReview = await request.json();
    const reviews = await getReviews();

    const index = reviews.findIndex((r) => r.id === updatedReview.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404, headers: NO_CACHE_HEADERS });
    }

    reviews[index] = { ...reviews[index], ...updatedReview };
    await saveReviews(reviews);

    return NextResponse.json(reviews[index], { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    await deleteReviewItem(id);
    return NextResponse.json({ success: true, message: 'Review deleted successfully' }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
