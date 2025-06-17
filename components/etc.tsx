import db from "@/lib/db";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import LikeButton from "./likebutton";

interface Props {
  tweetId: number;
  liked:   boolean;
}

export default async function Etc({tweetId,liked}:Props) {
   const commentCount = await db.comment.count({ where: { tweetId } });
   const likeCount = await db.like.count({where:{tweetId}})
  return (
    <div className="flex items-center justify-end gap-4">
       <LikeButton tweetId={tweetId} initialCount={likeCount} initialLiked={liked}/>
      <div  className="flex items-center space-x-1 bg-blue-50 hover:bg-blue-100 transition rounded-md px-2 py-1 cursor-auto">
        <div className="p-1 hover:bg-blue-200 rounded-full transition">
          <ChatBubbleBottomCenterIcon className="h-5 w-5 text-blue-600" />
        </div>
        <span className="text-sm font-medium text-blue-600">{commentCount}</span>
      </div>
    </div>
);
}
