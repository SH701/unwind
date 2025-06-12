"use server";

import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import db from "@/lib/db";

export async function getTweet(id: string) {
  const tweet = await db.tweet.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: { username: true },
      },
    },
  });

  if (!tweet) {
    notFound();    // 없으면 404
  }

  return tweet;
}

export async function getOwner(tweetId:number){
  const session = await getSession();
  if(!session.id) return ;
  const post = await db.tweet.findUnique({
    where:{id:tweetId},
    select:{userId:true},
  })
 return post?.userId === session.id;
}
export async function deleteTweet(id:number){
    await db.tweet.delete({
        where:{id}
    })
}