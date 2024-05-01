import { HomeComponent } from '@/components/Home';
import { PostTabs } from '@/components/PostTabs';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full relative">
      <div className="w-full mt-2">
        <PostTabs />
      </div>
      <HomeComponent />
    </div>
  );
}
