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

export async function GET(
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
    const page = Number(req.nextUrl.searchParams.get('page')) || 1;
    const skip = (page - 1) * 3;
    const isLast =
      Math.round(
        (await prisma.comment.findMany({ where: { postId } })).length / 3
      ) === page
        ? true
        : false;

    const comments = await prisma.comment.findMany({
      where: { postId },
      skip,
      take: 3,
      select: {
        content: true,
        createdAt: true,
        id: true,
        user: { select: { id: true, name: true, profile: true } },
      },
    });

    return NextResponse.json({
      message: 'Comments fetched successfully',
      success: true,
      comments,
      isLast,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error in getting comments', success: false },
      { status: 500 }
    );
  }
}
