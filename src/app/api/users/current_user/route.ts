import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      messge: 'Current user loaded successfully',
      succes: true,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message);
  }
}
