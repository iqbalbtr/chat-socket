import { MsgType } from "@contexts/chat/ChatContext";
import { useSearchMessage } from "@contexts/chat/message/SearchMessagteContext";

export default function SearchMessageCard({ data }: { data: MsgType }) {

    function getDate() {
        const now = new Date(data.info.timestamp);
        return `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
    }


    const { fn: { handleRefClick } } = useSearchMessage();

    return (
        <button onClick={() => handleRefClick(data.id)}>
            <div className="w-full p-2 flex flex-col items-start">
                <h2 className="text-sm text-icon-color">{getDate()}</h2>
                <p className="text-icon-color text-left line-clamp-1"><span>{data.info.from} :</span><span dangerouslySetInnerHTML={{ __html: data.msg }} /></p>
            </div>
        </button>
    )
}
