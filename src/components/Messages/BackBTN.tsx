'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

function BackBTN({ path }: { path: string }) {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        router.push(path);
      }}
    >
      <ArrowLeft />
    </div>
  );
}

export default BackBTN;
