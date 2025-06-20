import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#e9fbe5]">
      <div className="w-full max-w-md  px-10 py-12 text-center space-y-6">
        <div className="text-8xl">🌱</div>
        <h1 className="text-3xl font-bold text-gray-800">Unwind에 오신 걸 환영해요</h1>
        <p className="text-gray-600 text-base">
          일상의 쉼표, 지금 바로 시작해보세요.
        </p>

        <Link
          href="/create-account"
          className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
        >
          시작하기
        </Link>

        <div className="text-sm text-gray-500">
          이미 계정이 있나요?{" "}
          <Link href="/login" className="text-green-700 font-medium hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
