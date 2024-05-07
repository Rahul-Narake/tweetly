import { User } from '@/store/atoms/post';
import { ProfileContent } from './ProfileContent';
import { ProfileHeader } from './ProfileHeader';
import { ProfileImageSection } from './ProfileImage';
import prisma from '@/db';
import { ProfileTabs } from './ProfileTabs';

export async function getUserData(userId: number): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        dob: true,
        followers: true,
        following: true,
        bio: true,
        profile: true,
        posts: {
          select: {
            id: true,
          },
        },
      },
    });

    return user;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}

export async function Profile({ userId }: { userId: number }) {
  const user = await getUserData(userId);
  return (
    <div className="flex flex-col w-full">
      <ProfileHeader name={user?.name || ''} posts={user?.posts.length || 1} />
      <ProfileImageSection userId={userId} user={user} />
      <ProfileContent user={user} />
      <ProfileTabs userId={userId} />
    </div>
  );
}
