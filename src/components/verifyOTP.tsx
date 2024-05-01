'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

export function VerifyOTP() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter();
  const [verificationCode, setVerficationCode] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    try {
      if (verificationCode.length !== 6) {
        toast('Invalid Code', {
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
        return;
      }
      const { data } = await axios.post(`/api/users/verify`, {
        email,
        verificationCode,
      });
      if (data?.success) {
        router.push(`/signup/password?email=${email}`);
      } else {
        toast(data?.message, {
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
        return;
      }
    } catch (error) {
      toast('Something went wrong', {
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });
    }
    return;
  };
  return (
    <div className="flex items-center h-screen">
      <Card className="w-[80%] mx-auto md:w-[70%] lg:w-[30%] px-4 py-2">
        <div className="flex items-start">
          <button
            onClick={(e) => {
              router.push('/signup');
            }}
          >
            <ArrowLeft />
          </button>
        </div>
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl">
            We sent you a code
          </CardTitle>
          <div>
            <p className="text-slate-400">Enter it below to verify {email}</p>
          </div>
        </CardHeader>
        <CardContent className="flex items-center flex-col space-y-4">
          <div className="flex flex-col w-full">
            <Input
              name="verificationCode"
              id="verificationCode"
              placeholder="Verification code"
              onChange={(e) => {
                setVerficationCode(e.target.value);
              }}
              className="h-12"
            />
          </div>
          <div className="w-full">
            <Button
              className="w-full rounded-full h-12"
              disabled={verificationCode.length !== 6}
              onClick={handleSubmit}
            >
              Next
            </Button>
          </div>
          <div className="flex justify-start w-full">
            <button
              className="text-blue-400 text-left"
              onClick={async () => {
                const { data } = await axios.get(
                  `/api/users/generate?email=${email}`
                );
                console.log(data);
                toast(`${data?.message || 'Error in generating code'}`, {
                  action: { label: 'Close', onClick: () => toast.dismiss() },
                });
              }}
            >
              Generate code again
            </button>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
