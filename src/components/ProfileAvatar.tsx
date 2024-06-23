import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProfileAvatar({
  src,
  name,
}: {
  src?: string | null;
  name: string;
}) {
  return (
    <Avatar className="z-0">
      <AvatarImage src={src || 'https://github.com/shadcn.png'} />
      <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}
