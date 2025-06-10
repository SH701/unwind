"use client"

import { useFormStatus } from "react-dom";

interface Props{
    text:string;
}

export default function Button({text}:Props){
    const {pending} = useFormStatus();
    return(
        <button 
            className="disabled:bg-neutral-200 disabled:text-neutral-400 btn" 
            type="submit" 
            disabled={pending}>
            {pending ? "Loading..." : text}
        </button>
    )
}