import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthenticated', success: false },
        { status: 403 }
      );
    }
    const postId = Number(params.postId);
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      return NextResponse.json(
        {
          message: `Post not found with id ${postId}`,
          success: false,
        },
        { status: 400 }
      );
    }
    const existingBookmark = await prisma.bookmark.findFirst({
      where: { postId: postId, userId: Number(session?.user?.id) },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark?.id,
          userId: Number(session?.user?.id),
          postId,
        },
      });
      return NextResponse.json(
        {
          message: 'Bookmark removed successfully',
          success: true,
        },
        { status: 200 }
      );
    } else {
      await prisma.bookmark.create({
        data: { postId: postId, userId: Number(session?.user?.id) },
      });
      return NextResponse.json(
        {
          message: 'Post Bookmarked successfully',
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message || 'error in bookmark');
  }
}
