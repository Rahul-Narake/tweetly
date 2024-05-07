'use client';
import { usePathname, useRouter } from 'next/navigation';

export function MobileSidebarComponent({
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
      <div className="flex text-xl text-slate-400">{icon}</div>
      <h2 className="bolck text-xl text-slate-400">{title}</h2>
    </div>
  );
}
