import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function UserPage({
  params,
}: {
  params: { userId: String };
}) {
  const session = await getServerSession();
  if (session?.user) {
    redirect(`/profile/${params?.userId}/posts`);
  } else {
    redirect('/api/auth/signin');
  }
}
