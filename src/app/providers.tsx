'use client';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <RecoilRoot>{children}</RecoilRoot>
      </SessionProvider>
    </ThemeProvider>
  );
};
