'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Ellipsis } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ProfileAvatar } from './ProfileAvatar';
import { Button } from './ui/button';

export function ProfileComponent() {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex flex-wrap items-center justify-evenly hover:bg-slate-800  w-full p-2 hover:rounded-full">
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
              <Dialog>
                <DialogTrigger>
                  Logout {session?.data?.user?.email}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-sm text-slate-500">
                      Are you absolutely sure?
                    </DialogTitle>
                  </DialogHeader>
                  <Button
                    className="cursor-pointer"
                    onClick={async () => {
                      await signOut();
                      router.push('/api/auth/signin');
                    }}
                  >
                    Yes,Logout
                  </Button>
                </DialogContent>
              </Dialog>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
