import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';
import { signupInput } from '../../../../utils/types';
import { sendEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, email, dob }: { name: string; email: string; dob: string } =
      reqBody;

    const isValidData = await signupInput.safeParse(reqBody);

    if (!isValidData.success) {
      return NextResponse.json(
        { message: 'Please enter valid data', success: false },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      return NextResponse.json(
        {
          message: 'Email is already exists',
          success: false,
        },
        { status: 200 }
      );
    }

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        dob: new Date(dob),
        password: 'hgjkdlld',
      },
    });

    await sendEmail({
      email: createdUser.email,
      emailType: 'VERIFY',
      userId: String(createdUser.id),
    });
    return NextResponse.json({
      message: 'User created, verification code sent',
      success: true,
      email,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error?.message, success: false },
      { status: 500 }
    );
  }
}
