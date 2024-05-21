import { MobileNavbar } from '@/components/MobileNavbar';
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
      <div className="md:flex md:col-span-2 md:col-start-2 hidden">
        <Sidebar />
      </div>
      <div className="md:col-span-6 md:col-start-4 border-x border-slate-600 flex flex-col">
        <div className="overflow-y-scroll scroll-smooth h-[100vh] pb-2">
          {children}
        </div>
      </div>
      <div className="md:flex md:col-span-2 md:col-start-10 hidden md:flex-col p-2">
        <p>Adverties</p>
      </div>
    </div>
  );
}
