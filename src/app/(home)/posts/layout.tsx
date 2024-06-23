import { MobileNavbar } from '@/components/MobileNavbar';
import { PostType } from '@/components/PostsTypeButton';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/api/auth/signin');
  }
  return (
    <>
      <div className="sm:hidden flex">
        <MobileNavbar />
      </div>
      <div className="w-full bg-gray-900 z-50 sticky top-0 border-b-[1px] border-slate-400 flex justify-around py-1 h-12">
        <PostType title="For You" path="/posts/for_you" />
        <PostType title="Following" path="/posts/following" />
      </div>
      <div className="flex flex-col h-screen w-full overflow-y-scroll">
        {children}
      </div>
    </>
  );
}
