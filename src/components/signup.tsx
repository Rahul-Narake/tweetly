'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from './logo';
import { Input } from './ui/input';
import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';
import { DOB } from './dob';
import axios from 'axios';
export function Signup() {
  const [requiredError, setRequiredError] = useState({
    emailReq: false,
    nameReq: false,
  });

  const router = useRouter();
  const email = useRef('');
  const name = useRef('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [day, setDay] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetMonth = useCallback(
    (month: string): void => {
      setMonth(month);
    },
    [month]
  );
  const handleSetYear = useCallback(
    (year: string): void => {
      setYear(year);
    },
    [year]
  );
  const handleSetDay = useCallback(
    (day: string): void => {
      setDay(day);
    },
    [day]
  );

  const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }

    try {
      if (!email.current || !name.current) {
        setRequiredError({
          emailReq: email.current ? false : true,
          nameReq: name.current ? false : true,
        });
        return;
      }
      setLoading(true);
      const signupData = {
        name: name.current,
        email: email.current,
        dob: `${year}-${month}-${day}`,
      };

      const regex =
        /^(?:\d{4})-(?:0[1-9]|1[0-9]|2[0-9]|3[0-1])-(?:0[1-9]|1[0-2])$/;
      const isDobValid = regex.test(signupData.dob);
      if (!isDobValid) {
        toast('Please select valid date of birth', {
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
        return;
      }
      const { data } = await axios.post(`/api/users/signup`, signupData);
      setLoading(false);
      if (data.success) {
        router.push(`/verify-otp?email=${data?.email}`);
      } else {
        toast(`${data?.message || 'Error in signup'} `, {
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
        return;
      }
    } catch (error) {
      setLoading(false);
      toast(`${'Error in signup'} `, {
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });
      return;
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
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col w-full">
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="h-12"
                onChange={(e) => {
                  setRequiredError((prevState) => ({
                    ...prevState,
                    nameReq: false,
                  }));
                  name.current = e.target.value;
                }}
              />
              {requiredError.nameReq && (
                <span className=" text-red-500 mt-2">Name is required</span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="h-12"
                onChange={(e) => {
                  setRequiredError((prestate) => ({
                    ...prestate,
                    emailReq: false,
                  }));
                  email.current = e.target.value;
                }}
              />
              {requiredError.emailReq && (
                <span className=" text-red-500 mt-2">Email is required</span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <h2 className="mb-2">Date of birth</h2>
              <p className="text-sm text-slate-500">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </p>
              <div className="flex mt-4 w-full">
                <DOB
                  setMonth={handleSetMonth}
                  setDay={handleSetDay}
                  setYear={handleSetYear}
                />
              </div>
            </div>
            <Button
              className="rounded-full h-12 font-semibold"
              onClick={handleSubmit}
              disabled={!email.current || !name.current}
            >
              {!loading ? 'Next' : 'Please wait'}
            </Button>
          </div>
          <div className="flex mt-4">
            <p>Already have an account? </p>
            <span
              className="text-blue-600 ml-2 cursor-pointer"
              onClick={() => {
                router.push('/api/auth/signin');
              }}
            >
              Signin
            </span>
          </div>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
}
