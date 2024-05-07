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
  followers: Follower[];
  following: Following[];
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

export type Follower = {
  id: number;
  userId: number;
  followerId: number;
};
export type Following = {
  id: number;
  userId: number;
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
  followers: Follower[];
  following: Following[];
  bookmarks: Bookmark[];
};

const forYouPostSelector = selector({
  key: 'forYouPostSelector',
  get: async () => {
    const response = await axios.get('/api/post');
    return response.data.posts as Post[];
  },
});

const currentUserSelector = selector({
  key: 'currentUserSelector',
  get: async () => {
    const response = await axios.get('/api/users/current_user');
    return response.data.user as CurrentUser;
  },
});

export const postsAtom = atom<Post[]>({
  key: 'postsAtom',
  default: [],
});

export const postTypeAtom = atom({ key: 'postTypeAtom', default: 'for_you' });

export const currentUserAtom = atom<CurrentUser | null>({
  key: 'currentUserAtom',
  default: null,
});
