"use client"

import { writeTweet } from "@/app/(me)/tweet/actions"
import { useActionState } from "react"
import { PhotoIcon } from "@heroicons/react/24/outline";
import Button from "./button";


export default function AddTweet(){
    const [state,action] = useActionState(writeTweet,{success:false})
    return (
        <form action={action} className="space-y-4 pb-4 mb-6">
      <textarea
        name="tweet"
        placeholder="Tweet anything..."
        className="textarea-bordered rounded w-full border p-3"
      ></textarea>
       <div>
          <label className="w-full flex gap-2 items-center justify-center cursor-pointer  p-2 bg-gray-100 rounded hover:bg-gray-200">
          <PhotoIcon className="size-7 -rotate-30"/>
          <span className="font-semibold">사진 추가</span>
          <input
          type="file"
          name="photo"
          accept="image/*"
          className="hidden"
          />
        </label>
      </div>
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      <Button text="작성하기" />
    </form>
  );
}