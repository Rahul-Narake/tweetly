'use server';

import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { Post } from '@/store/atoms/post';

export async function getForYouPosts(): Promise<Post[]> {
  try {
    const session = await getServerSession(authOptions);
    const posts = await prisma.post.findMany({
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
            bio: true,
            profile: true,
            followers: true,
            following: true,
            posts: { select: { id: true } },
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
  } catch (error: any) {
    return [];
  }
}

export async function getFollowingPosts(): Promise<Post[]> {
  try {
    const session = await getServerSession(authOptions);

    const followingUsers = await prisma.following.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
      select: {
        followingId: true,
      },
    });

    const followingUserIds = followingUsers.map((user) => user.followingId);
    const posts = await prisma.post.findMany({
      where: {
        userId: {
          in: followingUserIds,
        },
      },
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
            bio: true,
            profile: true,
            followers: true,
            following: true,
            posts: { select: { id: true } },
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
  } catch (error: any) {
    return [];
  }
}

export async function getLimitedPosts({ page = 1 }: { page?: number }) {
  try {
    const session = await getServerSession(authOptions);
    const skip = (page - 1) * 3;
    const posts = await prisma.post.findMany({
      skip,
      take: 3,
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
            bio: true,
            profile: true,
            followers: true,
            following: true,
            posts: { select: { id: true } },
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
  } catch (error: any) {
    return [];
  }
}
