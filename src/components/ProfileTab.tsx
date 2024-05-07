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
    <div onClick={onclick}>
      <p
        className={`${
          path === pathName
            ? ' text-blue-700 cursor-pointer'
            : 'text-slate-300 cursor-pointer'
        }`}
      >
        {title}
      </p>
    </div>
  );
}
