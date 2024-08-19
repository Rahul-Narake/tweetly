'use server';
import prisma from '@repo/db/client';

export default async function seachUsersToMsg(
  searchInput: string
): Promise<ConversationType[] | null> {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchInput,
              mode: 'insensitive',
            },
          },
          {
            username: {
              contains: searchInput,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        name: true,
        profile: true,
        id: true,
        email: true,
      },
    });
    return users as ConversationType[];
  } catch (error) {
    console.log(error);
    return null;
  }
}
