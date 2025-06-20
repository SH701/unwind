"use client"

import { deletePhoto } from "@/app/(me)/profile/edit/actions";

export default function DeletePhoto(){
    const handleClick = async () => {
    await deletePhoto();
    location.reload(); 
  };
    return (
        <button onClick={handleClick} 
        className="text-sm font-semibold cursor-pointer text-red-500 hover:text-red-600">
          사진 삭제
        </button>
    )
}