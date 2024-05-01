'use client';

import { usePathname, useRouter } from 'next/navigation';

export function SidebarComponent({
  title,
  icon,
  path,
}: {
  title: string;
  icon: JSX.Element;
  path: string;
}) {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(path);
      }}
      className={`flex space-x-4 px-2 py-1 hover:cursor-pointer ${
        path === pathName ? 'rounded-full bg-slate-700 ' : ''
      }`}
    >
      <div className="flex text-xl">{icon}</div>
      <h2 className="hidden lg:block text-xl">{title}</h2>
    </div>
  );
}
