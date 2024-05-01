'use server';
import prisma from '@/db';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: 'twitter',
    },
    cloudinaryConfig.api_secret || ''
  );
  return { timestamp, signature };
}

export async function saveToDatabase({
  public_id,
  version,
  signature,
  secure_url,
  postId,
}: {
  public_id: string;
  version: string;
  signature: string;
  secure_url: string;
  postId: number;
}) {
  const session = await getServerSession(authOptions);
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret || ''
  );

  if (expectedSignature === signature) {
    try {
      const updatedPost = await prisma.post.update({
        where: { id: postId, userId: Number(session?.user?.id) },
        data: { image: secure_url },
      });
      if (updatedPost) {
        return { message: 'post created successfully', success: true };
      } else {
        return { message: 'Error in post save to db', success: false };
      }
    } catch (error: any) {
      return { message: error.message, success: false };
    }
  } else {
    return { message: 'Invalid request', success: false };
  }
}
