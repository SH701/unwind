"use client"

import Input from "@/components/input";
import { handleForm } from "./actions";
import Button from "@/components/button";
import { useActionState } from "react";


export default function LoginForm(){
    const [state,action] = useActionState(handleForm,null);
    return(
        <div className="flex flex-col gap-3 items-center justify-center pt-10">
            <span className="pb-7 text-6xl">🔥</span>
            <form action={action}>
            <div className="relative mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 absolute left-3 top-1/2  transform -translate-y-1/2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
            <Input  type="email" placeholder="Email" name="email" required/>
            </div>
            <div className="relative mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 absolute left-3 top-1/2  transform -translate-y-1/2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            <Input  type="text" placeholder="Username" name="username" required/>
            </div>
            <div className="relative mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 absolute left-3 top-1/2  transform -translate-y-1/2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>
            <Input  type="password" placeholder="Password" name="password" required
            className={`${state?.error ? "border-2 border-red-400":""} border rounded-2xl pl-10 py-1 placeholder:text-sm w-70`} />
            </div>
            {state?.error&&(
                <p className="text-red-500 pb-3 text-sm">{state?.error}</p>
            )}
            <Button text="Log in"/>
             {state?.message &&(
                <div className="px-3 py-1 bg-[#32BC6E] rounded-lg mt-3">
                    <p className="px-3">{state?.message}</p>
                </div>
            )}
            </form>
        </div>
    )
}