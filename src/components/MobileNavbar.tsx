import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import { MobileSidebar } from './MobileSidebar';

export async function MobileNavbar() {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex justify-between items-center w-full px-4 py-1 h-12">
      <MobileSidebar user={currentUser} />
      <h1 className="text-xl font-bold text-slate-200">Tweetly</h1>
    </div>
  );
}
