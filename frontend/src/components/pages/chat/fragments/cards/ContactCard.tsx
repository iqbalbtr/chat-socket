import { ContactType, useChat } from '@contexts/chat/ChatContext';
import { getTimeNotif } from '@utils/timeNotif';
function ContactCard({
    data
}: {
    data: ContactType
}) {

    const { current, fn: { handleCurrent } } = useChat();    

    console.log(data);
    

    return (

        <div
            onClick={() => handleCurrent(data, "private")}
            className={`bg-bg-secondary px-3 w-full p-2 py-3 border-b-[1px] border-[#212c33] text-white hover:bg-hover-color ${current.username === data.username && "bg-hover-color"}`}
        >
            <div
                className="flex w-full"
            >
                <span
                    className="w-[45px] h-[45px] aspect-square rounded-full bg-gray-500 flex items-center justify-center text-xl"
                >
                    @
                </span>
                <div
                    className="ml-3 flex w-full justify-between items-start"
                >
                    <div
                    >
                        <h3 className="font-semibold">{data.first_name}</h3>
                        <div>
                            <p
                                className="text-icon-color"
                            >{data.lastMsg?.msg}</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between gap-2 items-end'>
                        {data.lastMsg && <p className={`text-[.7rem] ${data.unread.length >= 1 && "text-green-accent"}`}>{getTimeNotif(data.lastMsg.time)}</p>}
                        {
                            data.unread.length >= 1 && (
                                <span
                                    className='w-[20px] h-[20px] rounded-full bg-green-accent flex justify-center items-center text-bg-primary text-sm'
                                >
                                    {data.unread.length}
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactCard
