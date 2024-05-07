'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function InProgress() {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col space-y-4 justify-center items-center">
      <h1 className="text-xl font-bold text-slate-200">Thanks for visit!!</h1>
      <p className="text-sm font-light text-green-400">
        This feature is still not in production..
      </p>
      <Button
        onClick={() => {
          router.push('/posts/for_you');
        }}
      >
        Go to Home
      </Button>
    </div>
  );
}
