'use server';
import prisma from '@/db';

export interface SearchDataType {
  id: number;
  name: string;
  username?: string;
  profile?: string;
}

export default async function getSearchData(
  searchInput: string
): Promise<SearchDataType[] | null> {
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
        username: true,
      },
    });
    return users as SearchDataType[];
  } catch (error) {
    console.log(error);
    return null;
  }
}
