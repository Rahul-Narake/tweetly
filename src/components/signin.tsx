'use client';
import { Logo } from './logo';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Toaster, toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function Signin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [requiredError, setRequiredError] = useState({
    emailReq: false,
    passReq: false,
  });
  const router = useRouter();
  const email = useRef('');
  const password = useRef('');
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState: any) => !prevState);
  }

  const handleSubmit = async (e?: React.FocusEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    if (!email.current || !password.current) {
      setRequiredError({
        emailReq: email.current ? false : true,
        passReq: password.current ? false : true,
      });
      return;
    }

    const res = await signIn('credentials', {
      username: email.current,
      password: password.current,
      redirect: false,
    });

    if (!res?.error) {
      router.push('/home');
    } else {
      toast('Error Signing in', {
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[80%] mx-auto md:w-[70%] lg:w-[30%]">
        <div className="flex justify-center">
          <Logo width="20px" height="20px" />
        </div>
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl">
            Signin to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col w-full">
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="h-12"
                onChange={(e) => {
                  setRequiredError((prevState) => ({
                    ...prevState,
                    emailReq: false,
                  }));
                  email.current = e.target.value;
                }}
              />
              {requiredError.emailReq && (
                <span className=" text-red-500 mt-2">Email is required</span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex border rounded-lg">
                <Input
                  className="border-0"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => {
                    setRequiredError((prevState) => ({
                      ...prevState,
                      passReq: false,
                    }));
                    password.current = e.target.value;
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      setIsPasswordVisible(false);
                      await handleSubmit();
                    }
                  }}
                />
                <button
                  className="inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {requiredError.passReq && (
                <span className=" text-red-500">Password is required</span>
              )}
            </div>

            <Button
              className="rounded-full h-12 font-semibold"
              disabled={!email.current || password.current.length < 6}
              onClick={() => {
                handleSubmit();
              }}
            >
              Signin
            </Button>
          </div>
          <div className="flex mt-4">
            <p>Don't have an account? </p>
            <span
              className="text-blue-600 ml-2 cursor-pointer"
              onClick={() => {
                router.push('/signup');
              }}
            >
              Signup
            </span>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}