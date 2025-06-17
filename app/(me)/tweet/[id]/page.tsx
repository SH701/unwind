import Link from "next/link";
import {getTweet,getOwner, getAllComments,} from "./actions";
import TweetDeleteForm from "@/components/deletetweet";
import { formatTimeAgo } from "@/lib/constant";
import UserIcon from "@/components/icon";
import {ChevronRightIcon  } from "@heroicons/react/24/solid";
import Back from "@/components/back";
import AddComments from "@/components/addcomment";
import DeleteComment from "@/components/deletecomment";
import Etc from "@/components/etc";
import Image from "next/image"


 export default async function TweetDetail({params,}: {params: Promise<{ id: string }>}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  const tweet = await getTweet(idStr);
  const owner = await getOwner(id);
  const comments = await getAllComments(id);
  return (
    <>
    <div className="md:mx-30 sm:mx-20 mx-10 mb-10 flex flex-col">
      <div className="flex gap-4">
    <Back/>
    <div className="flex gap-1/2 pt-1">
     <Link href="/tweet" className="text-lg font-bold hover:underline">Home</Link>
     <ChevronRightIcon className="size-4 mt-2 text-gray-400"/>
     <span className="mt-1 truncate">{tweet.tweet}</span>
     </div>
     </div>
    </div>
    <div className="px-6 py-4 bg-white rounded shadow md:mx-30 sm:mx-20 mx-10">
      <div className="flex items-center gap-2 mb-2">
          {tweet.user.photo ? (
                <Image
                  src={tweet.user.photo}
                  alt="avatar"
                  width={48}
                  height={48}
                  className="rounded-full size-10"
                />
              ) : (
                <UserIcon className="size-12 text-gray-400" />
              )}
        <span className="font-bold">{tweet.user.username}</span>
        <p className="text-[11px] font-bold text-gray-600">{formatTimeAgo(tweet.created_at)}</p>
        {owner && (
        <div className="flex gap-2 ml-auto ">
          <Link href={`/tweet/${id}/edit`}>
            <button className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-400">
              수정
            </button>
          </Link>
          <TweetDeleteForm id={id}/>
        </div>
      )}
      </div>
      <p className="text-base pl-2">{tweet.tweet}</p>
       <Etc tweetId={id} liked={false} />
    </div>
    <div className="border-b-2 border-gray-300 mt-10 mx-18"/>  
    <div className="md:mx-30 sm:mx-20 mx-10">
   <AddComments tweetId={tweet.id}/>
    </div>
    {comments.length === 0 ? null : (
  <div className="mt-4 space-y-4 rounded-lg  md:mx-30 sm:mx-20 mx-10">
    {comments.map((comment) => (
      <div
        key={comment.id}
        className="flex gap-3 p-3 bg-white rounded-lg transition">
            {tweet.user.photo ? (
              <Image
               src={tweet.user.photo}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full size-10"
              />
            ) : (
              <UserIcon className="size-10 text-gray-400" />
            )}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-baseline">
              <span className="font-semibold text-sm text-gray-800">
                {comment.user.username}
              </span>
              <span className="text-xs text-gray-500">
                {formatTimeAgo(comment.created_at)}
              </span>
            </div>
            {owner && (
              <DeleteComment id={comment.id} className="text-gray-400 hover:bg-red-400 transition" />
            )}
          </div>
          <p className="mt-1 text-gray-700">{comment.comment}</p>
        </div>
      </div>
    ))}
  </div>
)}
    </>
  );
}
