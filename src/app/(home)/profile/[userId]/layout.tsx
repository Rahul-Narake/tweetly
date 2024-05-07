import { ProfileHead } from '@/components/ProfileHead';

export default async function ProfileLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { userId: string };
}>) {
  return (
    <div className="flex flex-col">
      <ProfileHead userId={Number(params.userId)} />
      <div>{children}</div>
    </div>
  );
}
