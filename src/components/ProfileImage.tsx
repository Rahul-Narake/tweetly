// 'use client';
// import { handleFollowUnfollow } from '@/lib/actions/followUnfollow';
// import { getCurrentUser } from '@/lib/actions/getCurrentUser';
// import { CurrentUser, User } from '@/store/atoms/post';
// import { MessageSquareText, Pencil } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { toast } from 'sonner';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from './ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from './ui/button';
// import {
//   checkSignuature,
//   getSignature,
//   saveProfileURLTODB,
// } from '@/lib/actions/cloudinary';
// import axios from 'axios';
// import { EditProfile } from '@/lib/actions/editProfile';

// export function ProfileImageSection({
//   userId,
//   user,
// }: {
//   userId: number;
//   user: User | null;
// }) {
//   const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
//   const [image, setImage] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [name, setName] = useState(user?.name || '');
//   const [bio, setBio] = useState(user?.bio || '');
//   // const isFollowing = () => {
//   //   const values = currentUser?.following.filter(
//   //     (pr) => pr.followingId === userId && pr.userId === currentUser?.id
//   //   );

//   //   return values ? true : false;
//   // };

//   const handleCurrentUser = async () => {
//     const res = await getCurrentUser();
//     setCurrentUser(res);
//   };
//   useEffect(() => {
//     handleCurrentUser();
//   }, []);

//   const isCurrentUser = currentUser?.id === userId;

//   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       if (e.target.files[0].size > 1024 * 1000) {
//         toast('Image size or type not accepted', {
//           action: { label: 'Close', onClick: () => toast.dismiss() },
//         });
//         return;
//       } else {
//         setImage(e.target.files[0]);
//       }
//     }
//   };

//   const handleUploadImage = async (e: React.FormEvent<HTMLButtonElement>) => {
//     if (e) {
//       e.preventDefault();
//     }
//     try {
//       setLoading(true);
//       if (image && image !== null) {
//         const { timestamp, signature } = await getSignature();
//         const formData = new FormData();
//         formData.append('file', image);
//         formData.append(
//           'api_key',
//           String(process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
//         );
//         formData.append('signature', String(signature));
//         formData.append('timestamp', String(timestamp));
//         formData.append('folder', 'twitter');
//         const endpoint = String(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL);
//         const { data } = await axios.post(endpoint, formData);

//         if (data?.public_id) {
//           const isValid = await checkSignuature({
//             version: data?.version,
//             signature: data?.signature,
//             public_id: data?.public_id,
//           });
//           if (isValid) {
//             const resp = await saveProfileURLTODB({
//               secure_url: data?.secure_url,
//             });
//             setLoading(false);
//             toast(resp?.message, {
//               action: { label: 'close', onClick: () => toast.dismiss() },
//             });
//             if (resp?.success) {
//               window.location.reload();
//             }
//           }
//         }
//       }
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     if (e) {
//       e.preventDefault();
//     }

//     try {
//       setLoading(true);
//       if (!name || !bio) {
//         setLoading(false);
//         toast('All feilds required', {
//           action: { label: 'close', onClick: () => toast.dismiss() },
//         });
//         return;
//       }
//       const resp = await EditProfile({ name, bio });
//       setLoading(false);
//       toast(resp?.message, {
//         action: { label: 'close', onClick: () => toast.dismiss() },
//       });
//       if (resp?.success) {
//         window.location.reload();
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={'w-full px-2'}>
//       <div className="w-full flex items-center justify-center">
//         <div className="flex flex-col justify-center mr-4">
//           <img
//             src={
//               user?.profile ||
//               'https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1'
//             }
//             alt="profile"
//             width={30}
//             height={30}
//             className="w-40 h-40 rounded-full"
//           />
//           {isCurrentUser && (
//             <div className="flex justify-center w-full">
//               <Dialog>
//                 <DialogTrigger>
//                   <Pencil size={16} />
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader className="mb-2">
//                     <DialogTitle>Change Profile</DialogTitle>
//                     <div className="flex justify-between items-center">
//                       <img
//                         src={user?.profile || ''}
//                         alt="profile"
//                         className="w-36 h-36 rounded-full"
//                       />
//                       <div className="flex flex-col space-y-2">
//                         <Input
//                           type="file"
//                           id="profile"
//                           name="profile"
//                           onChange={handleOnChange}
//                         />
//                         <Button
//                           onClick={handleUploadImage}
//                           disabled={loading || image === null}
//                         >
//                           Change
//                         </Button>
//                       </div>
//                     </div>
//                   </DialogHeader>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           )}
//         </div>
//         {!isCurrentUser && (
//           <div className="flex justify-evenly space-x-4">
//             {isFollowing() && (
//               <div className="h-10 w-10 rounded-full border border-slate-200 cursor-pointer flex items-center justify-center">
//                 <MessageSquareText />
//               </div>
//             )}

//             <p
//               className="border border-slate-200 cursor-pointer flex items-center justify-center px-2 py-1 rounded-full"
//               onClick={async () => {
//                 const response = await handleFollowUnfollow(userId);

//                 toast(
//                   response?.message ||
//                     `${
//                       isFollowing()
//                         ? 'Unfollowed successfully'
//                         : 'Followed successfully'
//                     }`,
//                   {
//                     action: { label: 'close', onClick: () => toast.dismiss() },
//                   }
//                 );
//               }}
//             >
//               {isFollowing() ? 'Unfollow' : 'Follow'}
//             </p>
//           </div>
//         )}

//         {isCurrentUser && (
//           <div className="flex justify-evenly space-x-4">
//             <Dialog>
//               <DialogTrigger className="border-1 border-slate-300 rounded-full cursor-pointer bg-gray-600 px-2 py-1">
//                 Edit
//               </DialogTrigger>

//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Edit Details</DialogTitle>
//                 </DialogHeader>
//                 <div className="grid">
//                   <form
//                     onSubmit={handleSubmit}
//                     className="flex flex-col space-y-4"
//                   >
//                     <div className="flex flex-col space-y-2">
//                       <Label htmlFor="name">Name</Label>
//                       <Input
//                         name="name"
//                         id="name"
//                         type="text"
//                         value={name}
//                         onChange={(e) => {
//                           setName(e.target.value);
//                         }}
//                       />
//                     </div>
//                     <div className="flex flex-col space-y-2">
//                       <Label htmlFor="name">Bio</Label>
//                       <Input
//                         name="bio"
//                         id="bio"
//                         type="text"
//                         value={bio}
//                         onChange={(e) => {
//                           setBio(e.target.value);
//                         }}
//                       />
//                     </div>
//                     <div className="flex justify-center">
//                       <Button
//                         type="submit"
//                         disabled={loading || !name || !bio}
//                         className="w-full"
//                       >
//                         Save
//                       </Button>
//                     </div>
//                   </form>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';
import {
  CurrentUser,
  User,
  currentSelectedUserAtom,
  currentUserAtom,
} from '@/store/atoms/post';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { EditProfileComponent } from './EditProfile';
import { MessageCircle } from 'lucide-react';
import { handleFollowUnfollow } from '@/lib/actions/followUnfollow';
import { toast } from 'sonner';

export default function ProfileImage({
  currentUserInfo,
  userInfo,
}: {
  currentUserInfo: CurrentUser | null;
  userInfo: User | null;
}) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const [selectedUser, setCurrentSelectedUser] = useRecoilState(
    currentSelectedUserAtom
  );
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (currentUserInfo) {
      setCurrentUser(currentUserInfo);
    }
    if (userInfo) {
      setCurrentSelectedUser(userInfo);
    }
    if (userInfo && currentUserInfo) {
      const isfollowing = currentUserInfo.following.find(
        (x) => x.followingId === userInfo.id
      );
      if (isfollowing) {
        setFollowing(true);
      }
    }
  }, []);

  return (
    <div className="flex justify-around">
      {selectedUser?.id === currentUser?.id && (
        <span className="px-4 py-1 border-[1px] border-slate-300 rounded-full cursor-pointer">
          <EditProfileComponent user={currentUser} />
        </span>
      )}
      {selectedUser?.id !== currentUser?.id && (
        <div className="flex items-center space-x-4">
          <span className="px-1 py-1 cursor-pointer">
            <MessageCircle size={28} />
          </span>
          <span className="px-2 py-1 border-[1px] border-slate-300 rounded-full cursor-pointer ">
            <div className="flex justify-center items-center">
              <span
                onClick={async () => {
                  if (selectedUser) {
                    const resp = await handleFollowUnfollow(selectedUser?.id);
                    toast(resp?.message);
                    if (resp?.success) {
                      setFollowing(!following);
                    }
                  }
                }}
              >
                {following ? 'Unfollow' : 'Follow'}
              </span>
            </div>
          </span>
        </div>
      )}
    </div>
  );
}
