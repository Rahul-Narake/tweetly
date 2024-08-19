'use client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ComposePost } from './ComposePost';
import { DialogTitle } from '@radix-ui/react-dialog';

export function ComposePostButton() {
  return (
    <div className="flex mt-4">
      <Dialog>
        <DialogTrigger className="w-full bg-blue-400 p-2 rounded-full">
          post
        </DialogTrigger>
        <DialogContent aria-describedby="compose_post">
          <DialogTitle></DialogTitle>
          <ComposePost />
        </DialogContent>
      </Dialog>
    </div>
  );
}
