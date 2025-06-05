"use client"

import React from "react"

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
   errors?:string
}

export default function Input({...props}:Props){
    return(
        <div>
            <input className="border rounded-2xl pl-10 py-1 placeholder:text-sm w-70" 
            {...props}/>
        </div>
    )
}