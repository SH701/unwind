"use server"

import db from "@/lib/db"
import { getUser } from "../profile/actions";

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
export async function writeTweet(formData:FormData):Promise<void>{
    const content = formData.get("tweet")?.toString();
    if (!content) {
    throw new Error("Tweet 내용이 비어 있습니다.");
    }
    const user = await getUser();
    if(!user!.id){
        throw new Error ("로그인된 유저만 트윗을 작성할 수 있습니다.")
    }
    await db.tweet.create({
        data:{
            tweet:content,
            userId:user!.id
        }
    })
}
