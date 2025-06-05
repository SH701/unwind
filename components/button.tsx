"use client"

import { useFormStatus } from "react-dom";

interface Props{
    text:string;
}

export default function Button({text}:Props){
    const {pending} = useFormStatus();
    return(
        <button 
            className="w-70 rounded-2xl bg-gray-200 py-1 cursor-auto disabled:bg-neutral-200 disabled:text-neutral-400" 
            type="submit" 
            disabled={pending}>
            {pending ? "Loading..." : text}
        </button>
    )
}