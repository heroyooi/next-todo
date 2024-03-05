import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  const response = {
    message: '단일 할일 가져오기 성공',
    data: {
      id: params.slug,
      title: '오늘도 빡코딩!',
      is_done: false,
      query,
    },
  };
  return NextResponse.json(response, { status: 200 });
}
