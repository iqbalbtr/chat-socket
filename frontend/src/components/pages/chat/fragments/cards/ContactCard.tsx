import { ContactType, useChat } from '@contexts/chat/ChatContext';
import { getHourTime } from '@utils/timeNotif';
function ContactCard({
    data
}: {
    data: ContactType
}) {

    const { current, fn: { handleCurrent } } = useChat(); 

    return (
        <div onClick={() => handleCurrent(data, "private")}>
            <div
            // onClick={() => handleCurrent(data, "private")}
            className={`bg-bg-secondary px-3 w-full p-2 py-3 border-b-[1px] border-[#212c33] text-white hover:bg-hover-color`}
        >
            <div
                className="flex w-full"
            >
                <span
                    className="w-[45px] h-[45px] aspect-square rounded-full bg-gray-500 flex items-center justify-center text-xl"
                >
                    {data.name.charAt(0)}
                </span>
                <div
                    className="ml-3 flex w-full justify-between items-start"
                >
                    <div
                    >
                        <h3 className="font-semibold">{data.name} </h3>
                        <div>
                            <p
                                className="text-icon-color"
                            >{data.last_info.msg}</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between gap-2 items-end'>
                        {<p className={`text-[.7rem] ${data.last_info.unread >= 1 && "text-green-accent"}`}>{getHourTime(data.last_info.time) || ""}</p>}
                        {
                            data.last_info.unread >= 1 && (
                                <span
                                    className='w-[20px] h-[20px] rounded-full bg-green-accent flex justify-center items-center text-bg-primary text-sm'
                                >
                                    {data.last_info.unread}
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ContactCard
