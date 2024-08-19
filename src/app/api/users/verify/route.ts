import prisma from '@repo/db/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { verificationCode, email } = reqBody;

    if (!verificationCode || verificationCode.length !== 6) {
      return NextResponse.json(
        {
          message: 'Invalid verification code',
          success: false,
        },
        { status: 400 }
      );
    }
    const user = await prisma.user.findFirst({
      where: { verificationCode, email },
    });
    if (!user) {
      return NextResponse.json(
        { message: 'User not exist with this mail', success: false },
        { status: 400 }
      );
    }
    let exp = new Date(String(user.verificationCodeExpiry));

    const isExpired = new Date() > exp;

    if (isExpired) {
      return NextResponse.json(
        { message: 'Code is expierd, please generate again', success: false },
        { status: 200 }
      );
    }
    await prisma.user.update({
      where: { id: user?.id, email, verificationCode },
      data: { isVerified: true },
    });

    return NextResponse.json(
      { message: 'Verified successfully', success: true, email },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error?.message, success: false },
      { status: 500 }
    );
  }
}
