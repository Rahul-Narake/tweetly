'use client';

import { useRouter } from 'next/navigation';

export function Logo() {
  const router = useRouter();
  return (
    <h1
      className="text-xl font-bold text-slate-300"
      onClick={() => {
        router.push('/posts/for_you');
      }}
    >
      Tweetly
    </h1>
  );
}
