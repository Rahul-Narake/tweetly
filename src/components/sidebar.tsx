import {
  AppWindowMac,
  Bell,
  CircleEllipsis,
  ClipboardList,
  Home,
  Mail,
  Search,
  UserRound,
  X,
} from 'lucide-react';
import { SidebarComponent } from './sidebarcomponent';
import { ComposePostButton } from './ComposePostButton';
import { ProfileComponent } from './ProfileInfo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function Sidebar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col space-y-6 w-full pr-2">
      <SidebarComponent title="Home" icon={<Home />} path="/posts/for_you" />
      <SidebarComponent title="Explore" icon={<Search />} path="/explore" />
      <SidebarComponent
        title="Notifications"
        icon={<Bell />}
        path="/notifications"
      />
      <SidebarComponent title="Messages" icon={<Mail />} path="/messages" />
      <SidebarComponent title="Grok" icon={<AppWindowMac />} path="/grok" />
      <SidebarComponent title="Lists" icon={<ClipboardList />} path="/lists" />
      <SidebarComponent title="Premium" icon={<X />} path="/premium" />
      <SidebarComponent
        title="Profile"
        icon={<UserRound />}
        path={`/profile/${session?.user?.id}/posts`}
      />
      <SidebarComponent title="More" icon={<CircleEllipsis />} path="/more" />
      <ComposePostButton />
      <ProfileComponent />
    </div>
  );
}
