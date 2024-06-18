'use client';
import { CurrentUser, currentUserAtom } from '@/store/atoms/post';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { EditProfile } from '@/lib/actions/editProfile';
import { useRecoilState, useRecoilValue } from 'recoil';

export function EditProfileComponent({ user }: { user: CurrentUser | null }) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const [name, setName] = useState(currentUser?.name || user?.name);
  const [bio, setBio] = useState(currentUser?.bio || user?.bio || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    try {
      setLoading(true);
      if (!name || !bio) {
        setLoading(false);
        toast('All feilds required', {
          action: { label: 'close', onClick: () => toast.dismiss() },
        });
        return;
      }
      const resp = await EditProfile({ name, bio });
      if (resp?.success) {
        if (currentUser) setCurrentUser({ ...currentUser, name, bio });
      }
      setLoading(false);
      toast(resp?.message, {
        action: { label: 'close', onClick: () => toast.dismiss() },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser || user) {
      setBio(currentUser?.bio || user?.bio || '');
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger>Edit Profile</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="grid">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Bio</Label>
              <Input
                name="bio"
                id="bio"
                type="text"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={loading || !name || !bio}
                className="w-full"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
