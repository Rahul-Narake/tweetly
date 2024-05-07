'use server';
import prisma from '@/db';
import { Post, User } from '@/store/atoms/post';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

export async function getUserData(userId: number): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        dob: true,
        bio: true,
        profile: true,
        followers: true,
        following: true,
        posts: {
          select: {
            id: true,
          },
        },
      },
    });
    return user;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}

export async function getUsersPost({
  userId,
  page = 1,
}: {
  userId: number;
  page?: number;
}): Promise<Post[]> {
  try {
    const session = await getServerSession(authOptions);
    const skip = (page - 1) * 3;
    const posts = await prisma.post.findMany({
      skip,
      take: 3,
      where: { userId },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        image: true,
        likes: {
          select: {
            userId: true,
          },
        },
        bookmarks: {
          select: {
            userId: true,
          },
        },
        comments: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            followers: true,
            following: true,
            posts: { select: { id: true } },
            profile: true,
          },
        },
      },
    });

    const postsWithIsLiked = posts.map((post) => {
      const isLiked = post.likes.some(
        (like) => like.userId === Number(session?.user?.id)
      );
      const isBookmarked = post.bookmarks.some(
        (bookmark) => bookmark.userId === Number(session?.user?.id)
      );

      return {
        ...post,
        isLiked,
        isBookmarked,
        likesCount: post?.likes?.length,
        bookmarksCount: post?.bookmarks.length,
      };
    });

    return postsWithIsLiked;
  } catch (error) {
    console.log(error);
    return [];
  }
}
