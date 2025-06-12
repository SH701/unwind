import { formatTimeAgo } from "@/lib/constant";
import { getAllTweets, writeTweet } from "./actions";
import Button from "@/components/button";
import UserIcon from "@/components/icon";
import Link from "next/link";
import Etc from "@/components/etc";

export default async function Tweets() {
  const tweets = await getAllTweets();

  return (
    <div className="pb-10 px-10 ">
    <div className="flex flex-col gap-5 bg-green-50 p-7">
    <form action={writeTweet} className="space-y-4">
        <textarea name="tweet" placeholder="Tweet anything..." className="textarea-bordered rounded w-full border p-3"></textarea>
        <Button text="Tweet"/>
    </form>
    </div>
   <div className="mt-4 py-2 px-4 bg-green-50 rounded-lg shadow-lg">
       {tweets.map((tweet) => (
          <Link
           href={`/tweet/${tweet.id}`}
          key={tweet.id}
            className="block border-t-2 first:border-t-0 border-gray-200 pb-3 pt-4"
          >
            <div className="flex gap-3">
             <UserIcon className="size-10" />
              <div className="flex flex-col">
               <p className="text-sm">{tweet.user.username}</p>
                <p className="text-[11px] font-bold text-gray-600">
                  {formatTimeAgo(tweet.created_at)}
               </p>
               <p className="py-2 text-sm">{tweet.tweet}</p>
             </div>
           </div>
           <Etc/>
         </Link>
       ))}
      </div>
    </div>
  );
}
