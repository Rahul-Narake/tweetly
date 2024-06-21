import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/api/auth/signin');
  } else {
    redirect('/posts/for_you');
  }

  // if (session?.user) {
  //   redirect('/posts/for_you');
  // } else {
  //   return <LandingPage />;
  // }
}
