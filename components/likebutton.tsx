"use client";

import { dislikePost, likePost } from "@/app/(me)/tweet/[id]/actions";
import { HandThumbUpIcon as HandOutline } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  tweetId: number;
  initialCount: number;
  initialLiked: boolean;
}

export default function LikeButton({
  tweetId,
  initialCount,
  initialLiked,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);

  const toggle = () => {
    setLiked((l) => !l);
    setCount((c) => (liked ? c - 1 : c + 1));

    startTransition(async () => {
      if (liked) {
        await dislikePost(tweetId);
      } else {
        await likePost(tweetId);
      }
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className="flex items-center gap-1 p-2 rounded transition bg-green-100 text-green-600 cursor-pointer">      
        <HandOutline className="h-5 w-5" />
      <span>{count}</span>
    </button>
  );
}
