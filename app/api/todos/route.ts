import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = {
    message: 'todos 몽땅 가져오기',
    data: ['ㅇㅇ', 'ㅇㅇ'],
  }
  return NextResponse.json(response, {status: 200})
}