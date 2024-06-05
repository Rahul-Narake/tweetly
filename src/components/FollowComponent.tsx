'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

function FollowComponent({ title, path }: { title?: string; path?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={`cursor-pointer text-sm ${
        path === pathname ? 'text-blue-600' : 'text-slate-300'
      }`}
      onClick={() => {
        if (path) router.push(path);
      }}
    >
      <h2>{title}</h2>
    </div>
  );
}

export default FollowComponent;
