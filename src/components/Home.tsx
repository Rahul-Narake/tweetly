'use client';
import ForYou from './ForYou';
import { useRecoilValue } from 'recoil';
import { postTypeAtom } from '@/store/atoms/post';
import Following from './Following';

export function HomeComponent() {
  const postType = useRecoilValue(postTypeAtom);

  if (postType === 'for_you') {
    return <ForYou />;
  } else {
    return <Following />;
  }
}
