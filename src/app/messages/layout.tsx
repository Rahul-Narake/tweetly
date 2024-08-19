import Advertise from '@/components/Adverties';
import MessagesSidebar from '@/components/Messages/MessagesSidebar';
import SocketContextProvider from '@/context/SocketContext';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function MessagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  return (
    <SocketContextProvider>
      <div className="md:grid md:grid-cols-12 grid-cols-1 h-screen w-full hidden">
        <div className="md:flex md:col-span-2 md:col-start-2 hidden">
          <MessagesSidebar path="/messages" />
        </div>
        <div className="md:col-span-6 md:col-start-4 border-x border-slate-600 flex flex-col overflow-y-scroll scroll-smooth">
          {children}
        </div>
        <div className="md:flex md:col-span-2 md:col-start-10 hidden md:flex-col p-2">
          <Advertise />
        </div>
      </div>
      <div className="flex flex-col space-y-2 md:hidden col-span-1 w-full h-screen px-2">
        <MessagesSidebar path="/messages/user" />
        {children}
      </div>
    </SocketContextProvider>
  );
}
