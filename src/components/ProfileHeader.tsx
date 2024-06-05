// 'use client';
// import { ArrowLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// export function ProfileHeader({
//   name,
//   posts,
// }: {
//   name: string;
//   posts: number;
// }) {
//   const router = useRouter();
//   return (
//     <div className="flex items-center w-full h-12 px-2 bg-gray-900 py-1">
//       <div
//         className="mr-10 hover:cursor-pointer cursor-pointer"
//         onClick={() => {
//           router.push('/home');
//         }}
//       >
//         <ArrowLeft />
//       </div>
//       <div className="flex flex-col">
//         <h3>{name}</h3>
//         <p className="text-sm font-light text-slate-400">{posts} posts</p>
//       </div>
//     </div>
//   );
// }
