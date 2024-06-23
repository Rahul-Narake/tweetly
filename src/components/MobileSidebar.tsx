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
import { Bird, Bookmark, Search, UserRound } from 'lucide-react';
import { MobileSidebarComponent } from './MobileSidebarComponent';
import { LogoutButton } from './LogoutButton';
import { ComposePostButton } from './ComposePostButton';
import FollowComponent from './FollowComponent';

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
              <div className="flex space-x-4 items-center ">
                <div className="flex space-x-2 items-center ">
                  <p className="text-slate-100 font-semibold text-sm">
                    {user?.followers.length}
                  </p>
                  <FollowComponent
                    title="Followers"
                    path={`/${user?.id}/followers`}
                  />
                </div>
                <div className="flex space-x-2 items-center">
                  <p className="text-slate-100 font-semibold">
                    {user?.following.length}
                  </p>
                  <FollowComponent
                    title="Followings"
                    path={`/${user?.id}/followings`}
                  />
                </div>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4">
          <MobileSidebarComponent
            title="Tweets"
            icon={<Bird />}
            path={`/posts/for_you`}
          />
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
