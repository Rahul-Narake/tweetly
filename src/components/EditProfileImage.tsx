'use client';
import { Camera, Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { User } from '@/store/atoms/post';
import { useState } from 'react';
import {
  checkSignuature,
  getSignature,
  saveProfileURLTODB,
} from '@/lib/actions/cloudinary';
import axios from 'axios';
import { toast } from 'sonner';

export function EditProfileImage({ user }: { user: User | null }) {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size > 1024 * 1000) {
        toast('Image size or type not accepted', {
          action: { label: 'Close', onClick: () => toast.dismiss() },
        });
        return;
      } else {
        setImage(e.target.files[0]);
      }
    }
  };

  const handleUploadImage = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    try {
      setLoading(true);
      if (image && image !== null) {
        const { timestamp, signature } = await getSignature();
        const formData = new FormData();
        formData.append('file', image);
        formData.append(
          'api_key',
          String(process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
        );
        formData.append('signature', String(signature));
        formData.append('timestamp', String(timestamp));
        formData.append('folder', 'twitter');
        const endpoint = String(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL);
        const { data } = await axios.post(endpoint, formData);

        if (data?.public_id) {
          const isValid = await checkSignuature({
            version: data?.version,
            signature: data?.signature,
            public_id: data?.public_id,
          });
          if (isValid) {
            const resp = await saveProfileURLTODB({
              secure_url: data?.secure_url,
            });
            setLoading(false);
            toast(resp?.message, {
              action: { label: 'close', onClick: () => toast.dismiss() },
            });
            if (resp?.success) {
              window.location.reload();
            }
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Camera size={32} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Change Profile</DialogTitle>
          <div className="flex justify-between items-center">
            <img
              src={user?.profile || ''}
              alt="profile"
              className="w-36 h-36 rounded-full"
            />
            <div className="flex flex-col space-y-2">
              <Input
                type="file"
                id="profile"
                name="profile"
                onChange={handleOnChange}
              />
              <Button
                onClick={handleUploadImage}
                disabled={loading || image === null}
              >
                Change
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
