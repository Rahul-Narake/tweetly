'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();
  return (
    <span
      onClick={() => {
        router.push('/posts/for_you');
      }}
      className="cursor-pointer"
    >
      <ArrowLeft />
    </span>
  );
}
