import Link from "next/link";
import {getTweet,getOwner,} from "./actions";
import TweetDeleteForm from "@/components/deletetweet";
import { formatTimeAgo } from "@/lib/constant";
import UserIcon from "@/components/icon";
import {ChevronRightIcon  } from "@heroicons/react/24/solid";
import Back from "@/components/back";


 export default async function TweetDetail({params,}: {params: Promise<{ id: string }>}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  const tweet = await getTweet(idStr);
  const owner = await getOwner(id);
  return (
    <>
    <div className="mx-10 mb-10 flex flex-col mt-30">
      <div className="flex gap-4">
    <Back/>
    <div className="flex gap-1/2 pt-1">
     <Link href="/tweet" className="text-lg font-bold hover:underline">Home</Link>
     <ChevronRightIcon className="size-4 mt-2 text-gray-400"/>
     <span className="mt-1">{tweet.user.username}</span>
     </div>
     </div>
    </div>
    <div className="px-6 py-4 bg-white rounded shadow mx-10">
      <div className="flex items-center gap-2 mb-2">
        <UserIcon className="size-10"/>
        <span className="font-bold">{tweet.user.username}</span>
        <p className="text-[11px] font-bold text-gray-600">{formatTimeAgo(tweet.created_at)}</p>
        {owner && (
        <div className="flex gap-2 ml-auto ">
          <Link href={`/tweet/${id}/edit`}>
            <button className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer">
              수정
            </button>
          </Link>
          <TweetDeleteForm id={id}/>
        </div>
      )}
      </div>
      <p className="text-base pl-2">{tweet.tweet}</p>
      {/* 좋아요 댓글 */}
    </div>
    <div className="border-b-2 border-gray-300 mt-10 mx-8"></div>
    </>
  );
}
