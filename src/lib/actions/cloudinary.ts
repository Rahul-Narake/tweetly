'use server';
import prisma from '@repo/db/client';
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

export async function checkSignuature({
  public_id,
  version,
  signature,
}: {
  public_id: string;
  version: string;
  signature: string;
}) {
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret || ''
  );

  if (expectedSignature === signature) {
    return true;
  } else {
    return false;
  }
}

export async function savePostURLTODB({
  postId,
  secure_url,
}: {
  postId: number;
  secure_url: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    const updatedPost = await prisma.post.update({
      where: { id: postId, userId: Number(session?.user?.id) },
      data: { image: secure_url },
    });
    if (updatedPost) {
      return { message: 'post created successfully', success: true };
    } else {
      return { message: 'Error in post save to db', success: false };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function saveProfileURLTODB({
  secure_url,
}: {
  secure_url: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    const updatedUser = await prisma.user.update({
      where: { id: Number(session?.user?.id) },
      data: { profile: secure_url },
    });
    if (updatedUser) {
      return { message: 'Profile Updated successfully', success: true };
    } else {
      return { message: 'Error in Profile save to db', success: false };
    }
  } catch (error) {
    console.log(error);
  }
}
