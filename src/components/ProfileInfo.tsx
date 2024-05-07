'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Ellipsis } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ProfileAvatar } from './ProfileAvatar';

export function ProfileComponent() {
  const session = useSession();

  const router = useRouter();
  return (
    <div className="flex flex-wrap items-center justify-evenly hover:bg-slate-800 hover:cursor-pointer w-full p-2 hover:rounded-full">
      <ProfileAvatar
        src={session?.data?.user?.image}
        name={session?.data?.user?.name || ''}
      />
      {session?.data?.user && (
        <div className="flex flex-col">
          <h3 className="text-slate-300 text-md">
            {session?.data?.user?.name}
          </h3>
          <p className="text-slate-400 text-sm">{session?.data?.user?.email}</p>
        </div>
      )}

      <div>
        <Popover>
          <PopoverTrigger>
            <Ellipsis />
          </PopoverTrigger>
          <PopoverContent>
            {session?.data?.user && (
              <span
                className="text-sm text-slate-400 cursor-pointer"
                onClick={async () => {
                  await signOut();
                  router.push('/api/auth/signin');
                }}
              >
                Logout {session?.data?.user?.email}
              </span>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
