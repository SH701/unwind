"use server"

import db from "@/lib/db"
import { getUser } from "../profile/actions";
import z from "zod";
import { revalidatePath } from "next/cache";

const tweetSchema = z.object({
    tweet: z.string().min(1, "내용을 입력해주세요").max(280, "최대 280자까지 입력 가능합니다."),
});
export async function getAllTweets(){
    const tweet = await db.tweet.findMany({
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
    return tweet
}
export async function writeTweet(prevState: unknown, formData: FormData) {
  const tweet = formData.get("tweet");
  const result = tweetSchema.safeParse({ tweet });
  const user = await getUser();

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors.tweet?.[0],
    };
  }

  await db.tweet.create({
    data: {
      tweet: result.data.tweet,
      userId: user!.id, 
    },
  });
 revalidatePath("/");
  return { success: true };
}
