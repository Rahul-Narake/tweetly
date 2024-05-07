'use client';

import { usePathname, useRouter } from 'next/navigation';

export function PostType({ path, title }: { path: string; title: string }) {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div
      className={`${
        path === pathName
          ? 'flex items-center text-blue-700 cursor-pointer'
          : 'flex items-center text-slate-400 cursor-pointer'
      }`}
      onClick={() => {
        router.push(path);
      }}
    >
      {title}
    </div>
  );
}
