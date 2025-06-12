import Button from "@/components/button";
import { editTweet, getTweet } from "./actions";
import Back from "@/components/back";

export default async function EditTweet({params,}: {params: Promise<{ id: string }>}){
    const {id:idStr} = await params
    const id = Number(idStr)
    const tweet = await getTweet(id)
    return (
        <div className="px-10">
            <form action={editTweet} className="flex flex-col gap-5">
                <input type="hidden" name="id" value={id} />
                <Back/>
                <h1 className="text-center text-2xl pb-5">글 수정</h1>
                <textarea  name="tweet" required defaultValue={tweet?.tweet}
                className="bg-white w-full p-5 h-[50vh]" />
                <Button text="수정하기"/>
            </form>
        </div>
    )
}