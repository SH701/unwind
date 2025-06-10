import { NextRequest, NextResponse } from "next/server";



interface Route {
  [key: string]: boolean;
}
const publicUrls: Route = {
  "/": true,
  "/login": true,
  "/create-account": true,
};
export async function middleware(req:NextRequest){
    const cookie = req.cookies.get("tweet")
    const exists = publicUrls[req.nextUrl.pathname];

    if(!cookie){
        if(!exists){
            return NextResponse.redirect(new URL("/",req.url))
        }
    }else{
        if(exists){
            return NextResponse.redirect(new URL("/profile",req.url))
        }
    }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.svg).*)"],
};