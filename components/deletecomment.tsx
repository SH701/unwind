"use client"

import { deleteComment } from "@/app/(me)/tweet/[id]/actions"

interface Props{
  id:number;
  className:string
}

export default function DeleteComment({id,className}:Props){
    return (
        <form action={() => deleteComment(id)}>
             <button className={`px-3 py-1 bg-red-500 text-white rounded cursor-pointer ml-auto ${className}`}>
        삭제
      </button>
        </form>
    )
}