import { NextRequest, NextResponse } from 'next/server';
import { fetchATodo, deleteATodo } from '@/data/firestore';

// 할일 단일 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  const fetchedTodo = await fetchATodo(params.slug);

  if (fetchedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: '단일 할일 가져오기 성공',
    data: fetchedTodo,
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 단일 삭제 id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const deletedTodo = await deleteATodo(params.slug);

  if (deletedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: '단일 할일 삭제 성공',
    data: deletedTodo,
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 단일 수정 id
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { title, is_done } = await request.json();

  const editedTodo = {
    id: params.slug,
    title: title,
    is_done,
  };

  const response = {
    message: '단일 할일 수정 성공',
    data: editedTodo,
  };
  return NextResponse.json(response, { status: 200 });
}
