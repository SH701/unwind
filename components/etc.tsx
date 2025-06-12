import { HandThumbUpIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

export default function Etc(){
    return (
        <div className="flex gap-2 justify-end ">
        <div className="flex gap-2 ">
        <form action="">
            <button type="submit"><HandThumbUpIcon className="size-4 pt-1/2"/></button>
            <span className="mx-2 mt-2">0</span>
        </form>        
        </div>
        <div className="flex  ">
        <form action="">
            <button type="submit"><ChatBubbleBottomCenterIcon className="size-4 pt-1/2"/></button>
            <span className="mx-2 mt-2">0</span>
        </form>
        </div>
        </div>
    )
}