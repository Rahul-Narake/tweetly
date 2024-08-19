import prisma from '@repo/db/client';
import { sendEmail } from '@/lib/mailer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchPrams = req.nextUrl.searchParams;
  const email = searchPrams.get('email') || '';
  try {
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      return NextResponse.json(
        {
          message:
            'User is not signed up this email, please try to signup again',
          success: false,
        },
        { status: 400 }
      );
    }
    await sendEmail({
      email: user?.email,
      emailType: 'VERIFY',
      userId: String(user?.id),
    });
    return NextResponse.json(
      {
        message: `Code sent to ${email} successfully`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error?.message || 'error in generating code',
      },
      { status: 500 }
    );
  }
}
