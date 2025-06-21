import { getAllTweets } from "./actions";
import UserIcon from "@/components/icon";
import Link from "next/link";
import Etc from "@/components/etc";
import AddTweet from "@/components/addtweet";
import Image from "next/image";
import TweetDate from "@/components/tweetdate";
import { formatTimeAgo } from "@/lib/constant";

interface Props{
     searchParams: Promise<{ page?: string }>;
}
export const dynamic = "force-dynamic";

export default async function Tweets({searchParams}:Props) {
  const {page} = await searchParams;
  const pages = Number(page||"1")
  const {tweets,totalpage} = await getAllTweets(pages);
  return (
    <div className="pb-10 flex flex-col mx-5">
      <div className="flex flex-col gap-5 bg-green-50 p-7">
        <AddTweet />
      </div>

      {tweets.length === 0 ? (
        <span className="mt-5 text-center">등록된 글이 없습니다.</span>
      ) : (
        <div className="mt-4 py-2 px-4 bg-green-50 rounded-lg shadow-lg">
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
                  <UserIcon className="size-10 " />
                )}

                <div className="flex flex-col flex-1">
                  <div className="flex gap-2">
                    <p className="text-sm font-semibold">{tweet.user.username}</p>
                    <TweetDate date={formatTimeAgo(tweet.created_at)}/>
                  </div>
                  <p className="pt-2 text-sm">{tweet.tweet}</p>

                  {tweet.photo && (
                    <div className="mt-3">
                      <Image
                        src={tweet.photo}
                        alt="tweet image"
                        width={600}
                        height={400}
                        className="rounded-md object-contain max-h-96 w-auto mx-auto"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="pointer-events-none mt-2">
                <Etc tweetId={tweet.id} liked={false} />
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="flex gap-2 mt-6 justify-center">
        {Array.from({ length: totalpage }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <Link
              key={pageNum}
              href={`/tweet?page=${pageNum}`}
              className={`px-3 py-1 border rounded ${
                pages === pageNum ? "bg-green-600 text-white" : "bg-gray-100"
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
