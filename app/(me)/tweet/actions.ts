"use server"

import db from "@/lib/db"
import z from "zod";
import { revalidatePath } from "next/cache";
import { uploadImageToCloudflare } from "@/lib/upload";
import { getSession } from "@/lib/session";

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
  const session = await getSession();
  const user = session?.id
    ? await db.user.findUnique({ where: { id: session.id } })
    : null;
  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  const rawTweet = formData.get("tweet");
  const photo = formData.get("photo") as File;

  const result = tweetSchema.safeParse({ tweet: rawTweet });

  const tweetText = result.success ? result.data.tweet?.trim() : "";

  // 글, 사진 둘 다 없는 경우 막기
  if (!photo || photo.size === 0) {
    if (!tweetText) {
      return { success: false, error: "글 또는 사진 중 하나는 필수입니다." };
    }
  }

  let photoUrl = null;
  if (photo && photo.size > 0) {
    photoUrl = await uploadImageToCloudflare(photo);
  }

  await db.tweet.create({
    data: {
      tweet: tweetText ?? "", // tweet은 빈 문자열 가능하게 처리
      photo: photoUrl,
      userId: user.id,
    },
  });

  revalidatePath("/");
  return { success: true };
}