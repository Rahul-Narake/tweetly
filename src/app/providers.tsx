'use client';
import { ThemeProvider } from '@/components/theme-provider';
import AuthContextProvider from '@/context/AuthContextProvider';
import SocketContextProvider from '@/context/SocketContext';
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
        <RecoilRoot>
          <AuthContextProvider>{children}</AuthContextProvider>
        </RecoilRoot>
      </SessionProvider>
    </ThemeProvider>
  );
};
