"use client";

import { deleteTweet } from "@/app/(me)/tweet/[id]/actions"

export default function TweetDeleteForm({ id }: { id: number }) {
  return (
    <form action={() => deleteTweet(id)}>
      <button className="px-3 py-1 bg-red-500 hover:bg-red-400 text-white rounded cursor-pointer">
        삭제
      </button>
    </form>
  );
}