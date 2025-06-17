import { addComment } from "@/app/(me)/tweet/[id]/actions";
import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/solid";
interface Props{
    tweetId:number
}

export default async function AddComments({ tweetId }: Props) {
  return (
    <form action={addComment} className="space-y-2">
      <input type="hidden" name="tweetId" value={tweetId} />
      <div className="relative w-full mt-5">
        <input
          type="text"
          name="comment"
          placeholder="Comment..."
          className="w-full h-10 rounded shadow p-2 pr-10 bg-white"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-2 flex items-center justify-center"
        >
          <ArrowTurnDownLeftIcon className="size-8" />
        </button>
      </div>
    </form>
  );
}