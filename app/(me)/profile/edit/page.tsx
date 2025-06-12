import Link from "next/link";
import { getUserProfile } from "./actions";
import {XMarkIcon} from "@heroicons/react/24/solid"
import EditForm from "@/components/editprofile";


export default async function EditProfilePage() {
  const user = await getUserProfile();
  if (!user) return <p>유저 정보가 없습니다.</p>;

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between mx-10">
        <h1 className="text-xl font-semibold">프로필 수정</h1>
         <Link href="/profile">
          <XMarkIcon className="size-8 font-bold" />
        </Link>
      </div>
      <EditForm
        initialUsername={user.username}
        initialAvatar={user.photo}
      />
    </div>
  );
}