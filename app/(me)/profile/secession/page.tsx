
import { getUser, ProfileSecession } from "../actions";

export default async function Secession() {
  const sessionUser = await getUser();
  if (!sessionUser) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-3xl font-bold pb-5 border-b w-full max-w-lg  mb-8 ">
        탈퇴하기
      </h2>
      <p className="mb-2 md:text-xl">
        <strong>{sessionUser.username}</strong>님, 잠깐만요!
      </p>
      <p className="mb-12 md:text-xl">계정을 삭제하기 전에 꼭 읽어주세요.</p>

      <ul className="list-disc list-inside mb-6 space-y-2 md:text-xl bg-sky-50 px-5 py-7 text-gray-700">
        <li>모든 게시물, 댓글, 좋아요 등이 삭제됩니다.</li>
        <li>
          계정을 삭제한 후에는 계정을 살리거나, 게시글 등의 데이터를 복구할 수 없습니다.
        </li>
        <li>현재 계정으로 다시 로그인할 수 없습니다.</li>
      </ul>

      <form action={ProfileSecession} className="mt-10 w-full max-w-lg">
        <button
          type="submit"
          className="w-full btn bg-red-500 text-white hover:bg-red-400"
        >
          계정 삭제
        </button>
      </form>
      </div>
  );
}
