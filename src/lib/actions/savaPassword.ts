'use server';
import prisma from '@/db';
import bcrypt from 'bcrypt';
export async function savePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    if (password.length < 6) {
      return {
        message: 'Password must be greater than equal to 6 characters',
        success: false,
      };
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return {
        message: 'User not signed up , please try to signup first',
        success: false,
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email: email, id: user.id },
      data: { password: hashedPassword },
    });
    return { message: 'Password saved successfully', success: true };
  } catch (error: any) {
    console.log(error);
    return { message: 'Eroor in savinf password', success: false };
  }
}
