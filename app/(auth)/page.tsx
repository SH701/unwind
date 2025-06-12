// app/page.tsx 또는 app/(public)/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-8  px-4">
      <div className="flex flex-col items-center gap-4">
        <span className="text-9xl">🌱</span>
        <h1 className="text-4xl font-bold text-gray-800">어서오세요!</h1>
        <p className="text-gray-600 text-sm">지금 바로 Unwind 시작해보세요.</p>
      </div>

      <div className="flex flex-col items-center gap-3 w-full max-w-xs">
        <Link
          href="/create-account"
          className="w-full py-3 rounded-xl text-lg bg-blue-500 text-white text-center hover:bg-blue-600 transition-colors"
        >
          시작하기
        </Link>
        <div className="flex gap-1 text-sm text-gray-700">
          <span>이미 계정이 있나요?</span>
          <Link
            href="/login"
            className="text-blue-600 hover:underline underline-offset-4"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
