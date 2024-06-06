'use client';
import { useState } from 'react';
import React, { ChangeEvent } from 'react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import {
  checkSignuature,
  getSignature,
  savePostURLTODB,
} from '@/lib/actions/cloudinary';
import { useRecoilState } from 'recoil';
import { postsAtom } from '@/store/atoms/post';

export function ComposePost() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useRecoilState(postsAtom);

  const previewImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(null);
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file size (2MB limit)
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        setError('File size exceeds 1MB.');
        setImage(null);
        setPreviewUrl(null);
        return;
      }

      // Validate file type (only jpg, png, jpeg)
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setError('File format not supported. Only JPEG and PNG are allowed.');
        setImage(null);
        setPreviewUrl(null);
        return;
      }
      setError(null);
      setImage(file);
      previewImage(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setPreviewUrl(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }

    try {
      setLoading(true);
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
              const isValid = await checkSignuature({
                version: data1?.version,
                signature: data1?.signature,
                public_id: data1?.public_id,
              });
              if (isValid) {
                const response = await savePostURLTODB({
                  postId: data?.post?.id,
                  secure_url: data1?.secure_url,
                });
                setLoading(false);
                toast(response?.message, {
                  action: { label: 'close', onClick: () => toast.dismiss() },
                });
              } else {
                toast('Error in upload photo', {
                  action: { label: 'close', onClick: () => toast.dismiss() },
                });
              }
            }
          } catch (error: any) {
            setLoading(false);
            toast(error.message, {
              action: { label: 'Close', onClick: () => toast.dismiss() },
            });
            return;
          }
        } else {
          if (data?.success) {
            setPosts((posts) => [...posts, data?.post]);
            toast('Post created successfully', {
              action: { label: 'Close', onClick: () => toast.dismiss() },
            });
            setLoading(false);
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

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {previewUrl && (
            <div className="mt-2 relative">
              <img
                src={previewUrl}
                alt="Image Preview"
                className="w-full h-[200px]"
              />
              <button
                onClick={handleImageRemove}
                className="absolute top-0 right-0 bg-red-500 text-white py-1 px-2"
                aria-label="Remove image"
              >
                X
              </button>
            </div>
          )}
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
