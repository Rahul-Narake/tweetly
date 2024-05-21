import PostComponent from '@/components/PostComponent';
import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { Post } from '@/store/atoms/post';
import { getServerSession } from 'next-auth';

export async function getPost(postId: number): Promise<Post | null> {
  try {
    const session = await getServerSession(authOptions);
    const post = await prisma.post.findUnique({
      where: { id: postId },
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
    if (post) {
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
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getPost(Number(params.postId));
  return <PostComponent post={post} />;
}
