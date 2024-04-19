import { chat } from './cohereClient';
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { message, chatHistory } = data;
  const res = await chat(message, chatHistory);
  return Response.json({ res });
}
