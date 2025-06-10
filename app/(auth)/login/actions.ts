"use server"

import db from "@/lib/db";
import { redirect } from "next/navigation";
import z from "zod"
import bcrypt from "bcrypt"
import { LoginSession } from "@/lib/session";
import { PASSWORD_ERROR, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constant";

export interface FormState {
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
  success: boolean;
}

const checkEmail = async(email:string)=>{
  const user = await db.user.findUnique({
    where:{
      email,
    },
    select:{
      id:true,
    }
  })
  return Boolean(user);
}

const formSchema = z.object({
  email: z.string().email("이메일 형식을 확인해주세요.").toLowerCase().refine(checkEmail,{message:"이메일이 존재하지 않습니다."}),
  password: z.string().min(PASSWORD_MIN_LENGTH,"비밀번호는 최소 4자 이상이어야 합니다.").regex(PASSWORD_REGEX,PASSWORD_ERROR),
})

export async function LoginForm(prevState:FormState,formData:FormData){
  const data={
    email:formData.get("email"),
    password:formData.get("password")
  }
  const result = await formSchema.safeParseAsync(data)
  if(!result.success){
    return{
      fieldErrors:result.error.flatten().fieldErrors,
      success:false,
      }
  }else{
    const user = await db.user.findUnique({
      where:{
        email:result.data.email
      },
      select:{
        id:true,
        password:true,
      }
    })
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "오류"
    );
    if(ok){
      await LoginSession({id:user!.id})
      redirect("/profile")
    }else{
      return{
        fieldErrors:{
          email:["잘못된 이메일입니다."],
          password:["잘못된 비밀번호입니다."]
        },
        success:false,
      }
    }
  }
}