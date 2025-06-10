"use client"

import Link from "next/link"

export default function Header(){
    return(
        <header className="flex justify-between mt-5 mb-10 mx-5 *:text-2xl">
            <Link href={"/Tweet"} className="font-semibold">Moment</Link>
            <Link href={"/profile"} className="text-gray-700 ">My</Link>
        </header>
    )
}