'use client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ComposePost } from './ComposePost';

export function ComposePostButton() {
  return (
    <div className="flex">
      <Dialog>
        <DialogTrigger className="w-full bg-blue-400 p-2 rounded-full">
          post
        </DialogTrigger>
        <DialogContent>
          <ComposePost />
        </DialogContent>
      </Dialog>
    </div>
  );
}
