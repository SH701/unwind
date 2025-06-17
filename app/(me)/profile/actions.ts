"use server"

import db from "@/lib/db";
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation";

export async function getUser(){
    const session = await getSession();
    if(!session.id) throw new Error("존재하지 않는 유저")
    const user = await db.user.findUnique({
        where:{
            id:session.id,
        }
    })
    return user;
}

export async function Logout(){
    const user = await getUser();
    const session = await getSession();
    if(user && session){
        await session.destroy();
    }
    redirect("/")
}
export async function ProfileSecession(){
  const session = await getSession()
  const userId = session.id;
  await db.user.delete({
    where: { id: userId },
  });
  await session.destroy();
  redirect("/");
}
export async function getProfileUploadUrl(): Promise<{
  uploadUrl: string
  fileId: string
}> {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
    }
  )
  if (!res.ok) {
    throw new Error("Cloudflare에서 업로드 URL을 가져오지 못했습니다.")
  }

  const { result } = await res.json()
  
  return {
    uploadUrl: result.uploadURL,
    fileId: result.id,
  }
}