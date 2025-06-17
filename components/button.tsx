"use client"

import { useFormStatus } from "react-dom";

interface Props{
    text:string;
    className?:string
}

export default function Button({text,className}:Props){
    const {pending} = useFormStatus();
    return(
        <button 
            className={`disabled:bg-neutral-200 disabled:text-neutral-400 btn sm:h-10 ${className}`}
            type="submit" 
            disabled={pending}>
            {pending ? "Loading..." : text}
        </button>
    )
}