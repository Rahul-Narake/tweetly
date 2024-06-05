import FollowComponent from '@/components/FollowComponent';
import { MobileNavbar } from '@/components/MobileNavbar';

export default async function FollowLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { userId: string };
}>) {
  return (
    <div className="flex flex-col w-full">
      <div className="sm:hidden flex">
        <MobileNavbar />
      </div>
      <div className="flex items-center justify-around bg-gray-900 h-14 border-b-[1px] border-slate-300 sticky top-0">
        <FollowComponent
          title="Followers"
          path={`/${params?.userId}/followers`}
        />
        <FollowComponent
          title="Followings"
          path={`/${params?.userId}/followings`}
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
