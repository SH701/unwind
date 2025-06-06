"use client"

import Input from "@/components/input";
import {Login, LoginState } from "./actions";
import Button from "@/components/button";
import { useActionState  } from "react";
import { Email, Password, Username } from "@/lib/icon";




export default function LoginForm(){
     const [state, action] = useActionState(
  Login as unknown as (prevState: LoginState, formData: FormData) => Promise<LoginState>,
  { success: false, fieldErrors: {} }
);
    
    return(
        <div className="flex flex-col gap-3 items-center justify-center pt-10">
            <span className="pb-7 text-6xl">🔥</span>
            <form action={action}>
            <div className=" mb-3">
            <Input  type="email" placeholder="Email" name="email" required errors={state.success === false ? state.fieldErrors.email?.[0] : ""} icon={<Email/>}/>
            </div>
            <div className=" mb-3">
            <Input  type="text" placeholder="Username" name="username" required errors={state.success === false ? state.fieldErrors.username?.[0] : ""} icon={<Username/>}/>
            </div>
            <div className=" mb-3">
            <Input  type="password" placeholder="Password" name="password" required   errors={state.success === false ? state.fieldErrors.password?.[0] : ""} icon={<Password/>}/>
            </div>
            <Button text="Log in"/>
            </form>
            {state.success&&(
                <div className="mt-3 bg-green-500 font-bold p-4 rounded-lg w-70 flex items-center justify-center">
                  <span>✅ {state.message}</span>  
                </div>
            )}
        </div>
    )
}