"use server"

import db from "@/lib/db"
import { redirect } from "next/navigation"
import { z } from "zod";
import { getProfileUploadUrl } from "../actions";
import { buildProfileImageUrl, CLOUDFLARE_IMAGES_HOST } from "@/lib/utils";
import { getSession } from "@/lib/session";

const usernameSchema = z.string().min(2, "닉네임은 최소 2자 이상이어야 합니다.").max(20, "닉네임은 최대 20자까지 가능합니다.");


export async function getUserProfile(){
    const session = await getSession();
    if (session.id) {
    const user = await db.user.findUnique({
        where:{id:session.id},
        select:{
            photo:true,
            username:true,
        }
    })    
   return user;
    }
}
export async function updateProfile(formData:FormData):Promise<void>{
  const session = await getSession();
  if(!session.id) throw new Error("로그인 필요!")

  const raw = formData.get("username")
  const username = typeof raw === "string" ? raw : ""
  const parsed = usernameSchema.safeParse(username)
  if (!parsed.success)
    throw new Error(parsed.error.format()._errors?.[0] ?? "잘못된 닉네임입니다.")

  const file = formData.get("avatar")
  let avatarUrl: string | undefined;
  if (file instanceof File && file.size > 0) {
    const { uploadUrl, fileId } = await getProfileUploadUrl()
    const uploadForm = new FormData()
    uploadForm.append("file", file)
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      body: uploadForm,
    })
    if (!uploadRes.ok) {
      throw new Error("아바타 업로드에 실패했습니다.")
    }
    
    console.log("HOST:", CLOUDFLARE_IMAGES_HOST)
    avatarUrl = buildProfileImageUrl(fileId)
    console.log("FINAL URL:", avatarUrl)

    await db.user.update({
      where:{id:session.id},
      data:{
        username:parsed.data,
        ...(avatarUrl && {avatar:avatarUrl}),
      }
    })
    redirect(`/profile/${session.id}`)
  }
}