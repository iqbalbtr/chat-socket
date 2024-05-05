import { ContactType, useChat } from '@contexts/chat/ChatContext';
function ContactCard({
    data
}: {
    data: ContactType
}) {

    const { fn: { handleCurrent } } = useChat();

    return (

        <div
            onClick={() => handleCurrent(data, "private")}
            className="bg-bg-secondary px-3 my-1 w-full p-2 border-b-[1px] border-[#212c33] text-white"
        >
            <div
                className="flex w-full"
            >
                <span
                className="w-[45px] h-[45px] aspect-square rounded-full bg-gray-500 flex items-center justify-center text-xl"
                >
                    {data.name.charAt(0).toUpperCase()}
                </span>
                <div
                    className="ml-3 flex w-full justify-between items-start"
                >
                    <div
                    >
                        <h3 className="font-semibold">{data.name}</h3>
                        <div>
                            <p
                            className="text-icon-color"
                            >{data.lastMsg?.msg}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-[.7rem]">Friday</p>
                    </div>
                </div>
                {data.lastMsg && !data.lastMsg?.read && <span style={{
                    background: "var(--primary-color)",
                    width: "10px",
                    aspectRatio: "1/1",
                    position: "absolute",
                    right: 0
                }}></span>}
            </div>
        </div>
    )
}

export default ContactCard
