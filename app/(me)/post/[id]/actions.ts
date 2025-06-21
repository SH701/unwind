"use server";

import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import { getUser } from "../../profile/actions";
import { revalidatePath} from "next/cache";


export async function getTweet(id: string) {
  const tweet = await db.tweet.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: { username: true,photo:true },
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
  const tweet  = await db.tweet.findUnique({
    where:{id:tweetId},
    select:{id:true}
  })
  if(!tweet){
    throw new Error ("존재하지 않는 트윗입니다.")
  }
  await db.tweet.delete({
    where:{id:tweetId}
  })
  redirect("/tweet")
}

export async function addComment(formData: FormData) {
  const rawTweetId = formData.get("tweetId");
  const tweetId = Number(rawTweetId);
  const user = await getUser(); 
  const userId = user!.id;
  if (Number.isNaN(tweetId)) {
    throw new Error("유효한 tweetId가 아닙니다.");
  }
  const comment = formData.get("comment");
  if (typeof comment !== "string" || comment.trim() === "") {
    throw new Error("댓글을 입력해주세요.");
  }
  await db.comment.create({
    data: {
      comment: comment.trim(),
      userId,
      tweetId,
    },
  });
  revalidatePath(`/tweet/${tweetId}`);
}
export async function getAllComments(tweetId:number){
    const comment = await db.comment.findMany({
        where:{tweetId},
        orderBy:{created_at:"desc"},
        include:{
            user:{
                select:{
                    username:true,
                    photo:true,
                }
            }
        }
    });
    return comment
}
export async function deleteComment(commentId:number){
   const comment = await db.comment.findUnique({
    where:{id:commentId}
  })
  if(!comment){
    throw new Error ("존재하지 않는 댓글입니다.")
  }
  await db.comment.delete({
    where:{id:commentId}
  })
 revalidatePath(`/tweet/${comment.tweetId}`);
}



export async function likePost(tweetId:number) {
  const session = await getSession();
  const userId = session.id;

  const existing = await db.like.findFirst({
    where: { tweetId, userId },
    select: { id: true },
  });

 if (!existing) {
    await db.like.create({ data: { tweetId, userId } });
  }
  revalidatePath(`/tweet/${tweetId}`);
}

export async function dislikePost(tweetId: number) {
  const session = await getSession();
  const userId = session.id
 const like = await db.like.findFirst({
    where: { tweetId, userId },
    select: { id: true },
  });
  if (!like) {
    throw new Error("이 사용자는 이 글을 좋아요하지 않았습니다.");
  }
  await db.like.delete({
    where: { id: like.id },
  });

  revalidatePath(`/tweet/${tweetId}`);
}

