import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  if (!session?.user) {
    redirect('/api/auth/signin');
  } else {
    redirect('/posts/for_you');
  }
}
