'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const session = useSession();

  const router = useRouter();
  if (!session?.data?.user) {
    router.push('/api/auth/signin');
  } else {
    router.push('/posts/for_you');
  }
}
