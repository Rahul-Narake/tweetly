import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import { MobileSidebar } from './MobileSidebar';
import { Logo } from './logo';

export async function MobileNavbar() {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex justify-between items-center w-full px-4 py-1 h-12 z-60">
      <MobileSidebar user={currentUser} />
      <Logo />
    </div>
  );
}
