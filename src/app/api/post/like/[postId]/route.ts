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
    const existingLike = await prisma.like.findFirst({
      where: { postId: postId, userId: Number(session?.user?.id) },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike?.id,
        },
      });
      return NextResponse.json(
        {
          message: 'Post Unliked successfully',
          success: true,
        },
        { status: 200 }
      );
    } else {
      await prisma.like.create({
        data: { postId: postId, userId: Number(session?.user?.id) },
      });
      return NextResponse.json(
        {
          message: 'Post Liked successfully',
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message || 'error in like or dislike');
  }
}
