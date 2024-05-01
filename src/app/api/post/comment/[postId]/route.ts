import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { comment } from 'postcss';

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
    const reqBody = await req.json();
    if (!reqBody.content) {
      return NextResponse.json(
        { message: 'Content required to comment', success: false },
        { status: 400 }
      );
    }
    const postId = Number(params.postId);

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json(
        { message: 'Post not found', success: false },
        { status: 400 }
      );
    }
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId: session?.user?.id,
        content: reqBody.content,
      },
    });
    return NextResponse.json({
      message: 'Replied successfully',
      success: true,
      comment,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message);
  }
}
