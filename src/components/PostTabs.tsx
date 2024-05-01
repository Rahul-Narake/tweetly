'use client';

import { postTypeAtom } from '@/store/atoms/post';
import { useRecoilState } from 'recoil';

export function PostTabs() {
  const [postState, setPostType] = useRecoilState(postTypeAtom);
  return (
    <div className="flex justify-around bg-slate-950 border-b-[1px] border-b-slate-500 h-12 items-center pt-2">
      <div
        onClick={() => {
          setPostType('for_you');
        }}
        className={`${
          postState === 'for_you'
            ? 'border-b-2 border-b-blue-600 cursor-pointer hover:bg-gray-800 h-full '
            : 'cursor-pointer hover:bg-gray-800 h-full'
        }`}
      >
        For You
      </div>
      <div
        onClick={() => {
          setPostType('following');
        }}
        className={`${
          postState === 'following'
            ? 'border-b-2 border-b-blue-600 cursor-pointer hover:bg-gray-800 h-full'
            : 'cursor-pointer hover:bg-gray-800 h-full'
        }`}
      >
        Following
      </div>
    </div>
  );
}
