'use server';

import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { Post } from '@/store/atoms/post';

export async function getUsersLikedPost(userId: number): Promise<Post[]> {
  try {
    const session = await getServerSession(authOptions);
    const posts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            userId: Number(userId),
          },
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        image: true,
        likes: {
          where: { userId },
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
