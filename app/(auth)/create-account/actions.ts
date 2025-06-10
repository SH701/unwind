"use server"

import {z} from "zod"
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { LoginSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { PASSWORD_ERROR, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constant";

export interface FormState {
  fieldErrors?: {
    email?: string[];
    username?: string[];
    password?: string[];
    confirm_password?: string[];
  };
  success: boolean;
}

const checkPassword = ({password,confirm_password}:
    {password:string,confirm_password:string})=>password === confirm_password

const formSchema = z.object({
    username : z.string({
        invalid_type_error:"Username must be a string",
        required_error:"Where is username?"
    }).trim(),
    email : z.string().email("이메일 형식을 입력해주세요.").nonempty("이메일을 입력해주세요."),
    password: z.string().min(PASSWORD_MIN_LENGTH,"비밀번호는 최소 4자 이상이어야 합니다.").regex(PASSWORD_REGEX,PASSWORD_ERROR),
    confirm_password: z.string({required_error: "비밀번호 확인이 필요합니다.",}).min(PASSWORD_MIN_LENGTH, "비밀번호는 최소 10자 이상이어야 합니다.").nonempty()
})
.superRefine(async ({username},ctx)=>{
    const user = await db.user.findUnique({
        where:{
            username,
        },
        select:{
            id:true,
        }
    })
    if(user){
        ctx.addIssue({
            code:"custom",
            message:"닉네임이 존재합니다.",
            path:["username"],
            fatal:true
        });
    }
})
.superRefine(async ({email},ctx)=>{
    const user = await db.user.findUnique({
        where:{
            email
        },
        select:{
            id:true,
        }
    })
    if(user){
        ctx.addIssue({
            code:"custom",
            message:"이메일이 존재합니다.",
            path:["email"],
            fatal:true
        });
    }
})
.refine(checkPassword,{
    message:"비밀번호가 다릅니다.",
    path:["confirm_password"]
});
export async function createAccount(prevState:FormState,formData:FormData){
    const data={
        email:formData.get("email")?.toString(),
        username:formData.get("username")?.toString(),
        password:formData.get("password")?.toString(),
        confirm_password:formData.get("confirm_password")?.toString()
    }
    const result = await formSchema.safeParseAsync(data)
    if(!result.success){
    return {
        fieldErrors: result.error.flatten().fieldErrors,
        success: false, 
    };
    }else{
        const hashPassword = await bcrypt.hash(result.data.password,10)
        const user = await db.user.create({
            data:{
                username:result.data.username,
                email:result.data.email,
                password:hashPassword,
            },
            select:{
                id:true,
            }
        })
        await LoginSession(user);
        redirect("/profile")
    }
}