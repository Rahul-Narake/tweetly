'use server';

import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { Post } from '@/store/atoms/post';

export async function getForYouPosts(): Promise<Post[]> {
  try {
    console.log('from here');
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
      orderBy: {
        createdAt: 'desc',
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

    const followingUsers = await prisma.follows.findMany({
      where: {
        followerId: Number(session?.user?.id),
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

export async function getLimitedPosts({
  page = 1,
}: {
  page?: number;
}): Promise<Post[] | []> {
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
      orderBy: {
        createdAt: 'desc',
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

export async function getRepliedPosts({
  userId,
}: {
  userId: number;
}): Promise<Post[]> {
  try {
    const session = await getServerSession(authOptions);
    const posts = await prisma.post.findMany({
      where: {
        comments: {
          some: {
            userId,
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

export async function getTotalPosts(): Promise<number | null> {
  try {
    const posts = await prisma.post.findMany();
    return posts.length;
  } catch (error) {
    return null;
  }
}

export async function getUsersTotalPosts(
  userId: number
): Promise<number | null> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
    });
    return posts.length;
  } catch (error) {
    return null;
  }
}
