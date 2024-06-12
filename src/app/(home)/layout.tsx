import Advertise from '@/components/Adverties';
import { Sidebar } from '@/components/sidebar';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/api/auth/signin');
  }
  return (
    <div className="grid md:grid-cols-12 grid-cols-1 h-screen w-full">
      <div className="md:flex md:col-span-2 md:col-start-2 hidden pt-2">
        <Sidebar />
      </div>
      <div className="md:col-span-6 md:col-start-4 border-x border-slate-600 flex flex-col overflow-y-scroll scroll-smooth">
        {children}
      </div>
      <div className="md:flex md:col-span-2 md:col-start-10 hidden md:flex-col p-2 h-screen overflow-y-scroll">
        <Advertise />
      </div>
    </div>
  );
}
