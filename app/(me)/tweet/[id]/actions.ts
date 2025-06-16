"use server";

import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
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
    notFound();  
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
export async function deleteTweet(tweetId:number){
  const post = await db.tweet.findUnique({
    where:{id:tweetId}
  })
  if(!post){
    throw new Error ("존재하지 않는 트윗입니다.")
  }
  await db.tweet.delete({
    where:{id:tweetId}
  })
  redirect("/tweet")
}