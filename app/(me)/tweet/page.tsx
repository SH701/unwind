import { formatTimeAgo } from "@/lib/constant";
import { getAllTweets } from "./actions"
import UserIcon from "@/components/icon";
import Link from "next/link";
import Etc from "@/components/etc";
import AddTweet from "@/components/addtweet";
import Image from "next/image"

export default async function Tweets() {
  const tweets = await getAllTweets();

  return (
    <div className="pb-10 md:px-30 sm:px-20 px-10 flex flex-col">
    <div className="flex flex-col gap-5 bg-green-50 p-7">
   <AddTweet/>
    </div>
    {tweets.length === 0 ? (<span className="mt-5 text-center">등록된 글이 없습니다.</span>) : (<div className="mt-4 py-2 px-4 bg-green-50 rounded-lg shadow-lg">
       {tweets.map((tweet) => (
          <Link
           href={`/tweet/${tweet.id}`}
          key={tweet.id}
            className="block border-t-2 first:border-t-0 border-gray-200 pb-3 pt-4"
          >
            <div className="flex gap-3">
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
              <div className="flex flex-col">
               <p className="text-sm">{tweet.user.username}</p>
                <p className="text-[11px] font-bold text-gray-600">
                  {formatTimeAgo(tweet.created_at)}
               </p>
               <p className="pt-2 text-sm">{tweet.tweet}</p>
             </div>
           </div>
           <div className="pointer-events-none">
            <Etc tweetId={tweet.id}  liked={false}/>
           </div>
         </Link>
       ))}
      </div>)}
   
    </div>
  );
}
