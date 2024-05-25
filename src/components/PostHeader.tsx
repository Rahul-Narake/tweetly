'use client';

import { useRouter } from 'next/navigation';

export function getTimeDifference(timeString: Date): string {
  const inputDate = new Date(timeString);
  const currentDate = new Date();

  if (
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    // Calculate the difference in hours from the current time
    const hoursDifference = Math.floor(
      (currentDate.getTime() - inputDate.getTime()) / (1000 * 60 * 60)
    );
    return `${hoursDifference}h`;
  } else {
    // Return date and month name if the input date is not today

    const formattedDate = inputDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  }
}

export function PostHeader({
  name,
  email,
  time,
  userId,
}: {
  name?: string;
  email?: string;
  time?: Date;
  userId?: string;
}) {
  const router = useRouter();
  return (
    <div
      className="flex items-start cursor-pointer"
      onClick={() => {
        router.push(`/profile/${userId}/posts`);
      }}
    >
      <h3 className="text-md font-semibold mr-2 cursor-pointer">{name}</h3>
      <p className="text-sm text-slate-600 mr-2">{email}</p>
      {time && (
        <p className="textsm text-slate-600">{getTimeDifference(time)}</p>
      )}
    </div>
  );
}
