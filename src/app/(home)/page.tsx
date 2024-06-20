// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export default function Dashboard() {
//   const session = useSession();

//   const router = useRouter();
//   if (!session?.data?.user) {
//     router.push('/api/auth/signin');
//   } else {
//     router.push('/posts/for_you');
//   }
// }

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  console.log(session?.user);

  if (!session?.user) {
    redirect('/signin');
  } else {
    redirect('/posts/for_you');
  }
}
