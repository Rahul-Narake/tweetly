'use client';
import { useState } from 'react';
import React, { ChangeEvent } from 'react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { getSignature, saveToDatabase } from '@/lib/actions/cloudinary';
import { useRouter } from 'next/navigation';
export function ComposePost() {
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size > 1024 * 1000) {
        setImage(null);
        toast('Image size or type not accepted', {
          action: { label: 'Close', onClick: () => toast.dismiss() },
        });

        return;
      } else {
        setImage(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    try {
      if (content.length === 0) {
        return;
      }
      const { data } = await axios.post('/api/post', { content });

      if (data?.success) {
        if (image && image !== null) {
          try {
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
            const endpoint = String(
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
            );
            const { data: data1 } = await axios.post(endpoint, formData);
            if (data1.public_id) {
              const response = await saveToDatabase({
                version: data1?.version,
                signature: data1?.signature,
                public_id: data1?.public_id,
                secure_url: data1?.secure_url,
                postId: Number(data?.postId),
              });
              toast(response?.message, {
                action: { label: 'close', onClick: () => toast.dismiss() },
              });
              setLoading(false);
              if (response.success) {
                router.push('/home');
              }
            }
          } catch (error: any) {
            console.log(error);
            setLoading(false);
            toast(error.message, {
              action: { label: 'Close', onClick: () => toast.dismiss() },
            });
            return;
          }
        } else {
          if (data?.success) {
            toast('Post created successfully', {
              action: { label: 'Close', onClick: () => toast.dismiss() },
            });
            setLoading(false);
            router.push('/home');
            return;
          }
        }
      } else {
        toast(data?.message, {
          action: { label: 'Close', onClick: () => toast.dismiss() },
        });
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast('Error in post created', {
        action: { label: 'Close', onClick: () => toast.dismiss() },
      });
    }
  };

  return (
    <div className="flex w-full p-4">
      <form className="flex flex-col space-y-6 w-full">
        <div className="flex flex-col w-full space-y-4">
          <Textarea
            rows={8}
            className="px-1 bg-gray-900 text-slate-200"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="What is happening?"
          />
          <Input
            type="file"
            name="image"
            id="image"
            onChange={onChangeHandler}
          />
        </div>

        <Button
          disabled={content.length === 0 ? true : false || loading}
          type="submit"
          className="rounded-full h-12 font-semibold"
          onClick={handleSubmit}
        >
          Post
        </Button>
      </form>
    </div>
  );
}
