'use client';
import { Toaster, toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { savePassword } from '@/lib/actions/savaPassword';

export function PasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    const response = await savePassword({ email, password });
    if (response.success) {
      router.push('/');
    } else {
      toast(response.message, {
        action: { label: 'Close', onClick: () => toast.dismiss() },
      });
      return;
    }
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
            You&lsquo;ll need a password
          </CardTitle>
          <div>
            <p className="text-slate-400">
              make sure it&lsquo;s 6 character or more
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex items-center flex-col space-y-4">
          <div className="flex flex-col w-full">
            <Input
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="h-12"
            />
          </div>
          <div className="w-full">
            <Button
              className="w-full rounded-full h-12"
              disabled={password.length < 6}
              onClick={handleSubmit}
            >
              Signup
            </Button>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
