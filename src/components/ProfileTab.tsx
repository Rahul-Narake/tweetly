'use client';
import { usePathname } from 'next/navigation';

export function ProfileTab({
  title,
  onclick,
  path,
}: {
  title: string;
  onclick: () => void;
  path: string;
}) {
  const pathName = usePathname();

  return (
    <div
      className={`${
        path.replace('/', '') === pathName
          ? 'border-b-1 border-blue-400 text-slate-300 cursor-pointer'
          : 'text-slate-300 cursor-pointer'
      }`}
      onClick={onclick}
    >
      <p>{title}</p>
    </div>
  );
}
