import UserIcon,{Arrow} from "@/components/icon";
import { getUser, Logout } from "./actions";
import Image from "next/image";
import Link from "next/link";

export default async function Profile() {
  const user = await getUser();

  return (
    <div className="min-h-screen w-full flex flex-col px-4 items-center">
      <div className="flex items-center gap-5 border-2 border-gray-300 bg-white shadow-md rounded-xl p-4 w-full max-w-md">
        {user?.photo ? (
          <div className="w-12 h-12 relative rounded-full overflow-hidden">
            <Image
              src={user.photo}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <UserIcon className="size-12 text-gray-500" />
        )}
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">{user?.username}</span>
          <span className="text-gray-600 text-sm">{user?.email}</span>
        </div>
        <Link href="/profile/edit" className="flex ml-auto mr-5">
           <Arrow className="size-7 " />
        </Link>
      </div>
      <form action={Logout} className="mt-6 w-full max-w-md">
        <button type="submit" className="btn w-full">
          로그아웃
        </button>
      </form>
    </div>
  );
}
