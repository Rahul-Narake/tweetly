import { Profile } from '@/components/Profile';

export default function UserPage({ params }: { params: { userId: String } }) {
  return <Profile userId={Number(params.userId)} />;
}
