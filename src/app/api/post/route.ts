import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { PostInput } from '@/utils/types';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const reqBody = await req.json();
    const isValidData = PostInput.safeParse(reqBody);
    if (!isValidData.success) {
      return NextResponse.json(
        { message: 'Invalid Data', success: false },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email: session?.user.email, id: session?.user?.id },
    });
    if (!user) {
      return NextResponse.json(
        { message: 'User not exist', success: false },
        { status: 403 }
      );
    }
    const post = await prisma.post.create({
      data: { content: reqBody.content, userId: Number(session?.user?.id) },
    });
    return NextResponse.json({
      message: 'Post Created successfully',
      success: true,
      postId: post?.id,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error?.message, success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthenticated', success: false },
        { status: 403 }
      );
    }
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
    return NextResponse.json({
      message: 'Posts loaded successfully',
      posts: postsWithIsLiked,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
