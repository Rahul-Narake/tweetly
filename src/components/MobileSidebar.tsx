import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CurrentUser } from '@/store/atoms/post';
import { ProfileAvatar } from './ProfileAvatar';
import { Bookmark, Search, UserRound } from 'lucide-react';
import { MobileSidebarComponent } from './MobileSidebarComponent';
import { LogoutButton } from './LogoutButton';
import { ComposePostButton } from './ComposePostButton';

export function MobileSidebar({ user }: { user: CurrentUser | null }) {
  return (
    <Sheet>
      <SheetTrigger>
        <ProfileAvatar
          name={user?.name || ''}
          src={user?.profile}
          key={user?.id}
        />
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader className="mb-8">
          <SheetTitle>
            <div className="flex flex-col justify-start text-left">
              <ProfileAvatar
                name={user?.name || ''}
                src={user?.profile}
                key={user?.id}
              />

              <h2 className="text-start text-sm text-slate-200 mt-2 font-semibold">
                {user?.name}
              </h2>
              <p className="text-start text-sm font-light text-slate-400">
                {user?.email}
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <div className="flex space-x-2">
                  <span className="text-sm text-slate-200 ">
                    {user?.followers.length}
                  </span>
                  <p className="text-sm text-slate-400">Followers</p>
                </div>
                <div className="flex space-x-2">
                  <span className="text-sm text-slate-200 ">
                    {user?.following.length}
                  </span>
                  <p className="text-sm text-slate-400">Followings</p>
                </div>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4">
          <MobileSidebarComponent
            title="Profile"
            icon={<UserRound />}
            path={`/profile/${user?.id}/posts`}
          />
          <MobileSidebarComponent
            title="Bookmarks"
            icon={<Bookmark />}
            path={`/profile/${user?.id}/replies`}
          />
          <MobileSidebarComponent
            title="Explore"
            icon={<Search />}
            path={`/explore`}
          />

          <LogoutButton />
          <ComposePostButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}
