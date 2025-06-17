"use client"

import { writeTweet } from "@/app/(me)/tweet/actions"
import { useActionState } from "react"

import Button from "./button";

function Submit(){
    return(
        <Button text="작성하기"/>
    )
}

export default function AddTweet(){
    const [state,action] = useActionState(writeTweet,{success:false})
    return (
        <form action={action} className="space-y-4 pb-4 mb-6">
      <textarea
        name="tweet"
        placeholder="Tweet anything..."
        className="textarea-bordered rounded w-full border p-3"
      ></textarea>
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      <Submit />
    </form>
  );
}