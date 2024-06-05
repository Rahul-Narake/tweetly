import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/');
  } else {
    redirect('api/auth/signin');
  }
}

export default page;
