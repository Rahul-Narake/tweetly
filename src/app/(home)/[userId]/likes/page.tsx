// 'use client';

// import { Loader } from '@/components/Loader';
// import { PostCard } from '@/components/PostCard';
// import { getUsersLikedPost } from '@/lib/actions/getLikesPosts';
// import { getUserId } from '@/lib/utils';
// import { postsAtom } from '@/store/atoms/post';
// import { ArrowLeft } from 'lucide-react';
// import { usePathname } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useRecoilState } from 'recoil';

// export default function UsersLikedPost() {
//   const path = usePathname();
//   const userId = getUserId(path);
//   const [loading, setLoading] = useState(false);
//   const [posts, setPosts] = useRecoilState(postsAtom);
//   const router = useRouter();

//   const getPosts = async () => {
//     setLoading(true);
//     const posts = await getUsersLikedPost(Number(userId));
//     setLoading(false);
//     setPosts(posts);
//   };
//   useEffect(() => {
//     getPosts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col w-full space-y-4">
//       <div
//         className="flex items-center cursor-pointer fixed top-0  py-1 px-2 z-30 w-full"
//         onClick={() => {
//           router.push('/home');
//         }}
//       >
//         <ArrowLeft />
//       </div>
//       <div className="relative top-9">
//         {posts &&
//           posts.map((post) => {
//             return <PostCard post={post} key={post?.id} />;
//           })}
//       </div>
//     </div>
//   );
// }
