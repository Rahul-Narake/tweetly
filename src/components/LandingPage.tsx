'use client';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

function LandingPage() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-full">
      <Button
        onClick={() => {
          router.push('api/auth/signin');
        }}
      >
        Signin
      </Button>
    </div>
  );
}

export default LandingPage;
