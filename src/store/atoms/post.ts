import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import axios from 'axios';
import { atom, selector } from 'recoil';
export type UserPost = {
  id: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  bio?: string | null;
  profile?: string | null;
  followers: Follow[];
  following: Follow[];
  posts: { id: number }[];
};

export type Comment = {
  id: number;
  postId: number;
  content: string;
  userId: number;
};

export type Post = {
  id: number;
  user: User;
  content: string;
  createdAt: Date;
  image?: string | null;
  title?: string | null;
  isLiked: boolean;
  isBookmarked: boolean;
  likesCount: number;
  bookmarksCount: number;
  comments: Comment[];
};

export type Follow = {
  id: number;
  followerId: number;
  followingId: number;
};

export type Bookmark = {
  id: number;
  userId: number;
  postId: number;
  createdAt: Date;
};

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
  image?: string;
  username?: string;
  profile?: string | null;
  bio?: string | null;
  dob: Date;
  followers: Follow[];
  following: Follow[];
  bookmarks: Bookmark[];
};

// const forYouPostSelector = selector({
//   key: 'forYouPostSelector',
//   get: async () => {
//     const response = await axios.get('/api/post');
//     return response.data.posts as Post[];
//   },
// });

// const currentUserSelector = selector({
//   key: 'currentUserSelector',
//   get: async () => {
//     const response = await getCurrentUser();
//     return response;
//   },
// });

export const postsAtom = atom<Post[]>({
  key: 'postsAtom',
  default: [],
});

export const postTypeAtom = atom({ key: 'postTypeAtom', default: 'for_you' });

export const currentUserAtom = atom<CurrentUser | null>({
  key: 'currentUserAtom',
  default: null,
});

export const currentSelectedPostAtom = atom<Post | null>({
  key: 'currentSelectedPostAtom',
  default: null,
});

export const currentSelectedUserAtom = atom<User | null>({
  key: 'currentSelectedUserAtom',
  default: null,
});
