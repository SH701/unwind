import Link from "next/link"

export default function Header(){
    return(
        <header className="flex justify-between items-center px-5 max-w-[1000px] mx-auto w-full mb-5 *:text-2xl">
            <Link href={"/tweet"} className="font-semibold">Unwind</Link>
            <Link href={"/profile"} >My</Link>
        </header>
    )
}