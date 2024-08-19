'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import prisma from '@repo/db/client';

export async function EditProfile({
  name,
  bio,
}: {
  name: string;
  bio: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    const updatedUser = await prisma.user.update({
      where: { id: Number(session?.user?.id) },
      data: {
        name,
        bio,
      },
    });
    if (updatedUser) {
      return { message: 'User profile updated successfully', success: true };
    }
  } catch (error) {
    console.log(error);
  }
}
