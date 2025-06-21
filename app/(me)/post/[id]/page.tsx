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
import TweetDate from "@/components/tweetdate";


 export default async function TweetDetail({params,}: {params: Promise<{ id: string }>}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  const tweet = await getTweet(idStr);
  const owner = await getOwner(id);
  const comments = await getAllComments(id);
  return (
    <>
    <div className=" mb-10 flex flex-col mx-5">
      <div className="flex gap-4">
    <Back/>
    <div className="flex gap-1/2 pt-1">
     <Link href="/tweet" className="text-lg font-bold hover:underline">Home</Link>
     <ChevronRightIcon className="size-4 mt-2 text-gray-400"/>
     <span className="mt-1 truncate">{tweet.tweet}</span>
     </div>
     </div>
    </div>
    <div className="px-6 py-4 bg-[#F0FDF4] rounded shadow mx-5">
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
                <UserIcon className="size-12 " />
              )}
        <span className="font-bold">{tweet.user.username}</span>
        <TweetDate date={formatTimeAgo(tweet.created_at)}/>
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
      <p className="text-base pl-10">{tweet.tweet}</p>
        {tweet.photo && (
          <div className="mt-2">
            <Image
              src={tweet.photo}
              alt="tweet image"
              width={600}
              height={400}
              className="rounded-md object-contain max-h-96 w-full mb-2"
            />
          </div>
        )}
       <Etc tweetId={id} liked={false} />
    </div>
    <div className="border-b-2 border-gray-300 mt-10"/>  
    <div className="mx-5">
   <AddComments tweetId={tweet.id}/>
    </div>
    {comments.length === 0 ? <span className="flex items-center justify-center my-5">등록된 댓글이 없습니다.</span> : (
  <div className=" space-y-4 rounded-lg mx-5 mb-10">
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
               <TweetDate date={formatTimeAgo(comment.created_at)}/>
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
