import React from 'react'
import style from "../../styles/chat.module.css"
import Modal from '@components/core/Modal';
import MessageMenuList from '../core/MessageMenuList';
import { useSession } from '@providers/AuthProvider';
import { MsgType } from '@contexts/chat/ChatContext';
import { colors } from '../../../../../constants/color';

function MessageCard({
    data
}: {
    data: MsgType
}) {

    const [tglChat, setTglChat] = React.useState(false);
    const { user } = useSession();
    const current: string = "private"


    function getTimeMsg(date: number) {
        const now = new Date(date);

        return `${now.getHours()}:${now.getMinutes()}`
    }

    return (
        <div

            className={`w-full flex my-2 text-white`}
            style={{
                justifyContent: data.info.from === user.username ? "flex-end" : "flex-start"
            }}
        >
            {
                data.info.from !== user.username && current === "group" &&
                <span className={style.message_card_profile}>{data.info.from.charAt(0).toUpperCase()}</span>
            }
            <div>
                {
                    current === "group" && (
                        <h5
                            style={{
                                textAlign: data.info.from === user.username ? "right" : 'left'
                            }}
                        >
                            {data.info.from === user.username ? "You" : data.info.from}
                        </h5>
                    )
                }


                {/* Message Body Start */}
                <div
                    className={`${data.info.from === user.username ? "bg-green-primary" : "bg-hover-color"} flex flex-col py-1 px-1 max-w-[36rem] group `}
                    style={{
                        position: "relative",
                        borderRadius: user.username === data.info.from ? "12px 12px 0" : "12px 12px 12px 0px"
                    }}
                >


                    {/* Toggle list message menu */}

                    <span
                        onClick={() => setTglChat(pv => !pv)}
                        className={`absolute right-0 top-0 rounded-full ${user.username === data.info.from ? "bg-green-primary" : "bg-hover-color"} hidden group-hover:flex`}>


                        {/* Modal List message start */}
                        {
                            tglChat && (
                                <Modal
                                    open={tglChat}
                                    setOpen={setTglChat}
                                    filter={false}
                                    center={false}
                                    styles={{
                                        position: "absolute",
                                        left: data.info.from === user.username ? "-450%" : "120%",
                                    }}
                                >
                                    <MessageMenuList msg={data} setTgl={setTglChat} />
                                </Modal>
                            )
                        }
                        {/* Modal List message end */}


                        {/* Icon List Messsage start */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={30}
                            height={30}
                            id="angle-bottom-b">
                            <path
                                fill={colors.ICON_COLOR}
                                d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
                            >
                            </path>
                        </svg>
                        {/* Icon List Messsage end */}
                    </span>
                    {/* Toggle List message End*/}

                    {/* Message Reply Cards start */}
                    {
                        data.pull.status && (
                            <div style={{
                                padding: 6,
                                marginBottom: 3,
                                borderRadius: 6,
                            }}
                                className='bg-green-secondary rounded-2xl border-l-4 border-green-accent'
                            >
                                {
                                    data.fwd && data.fwd !== current && <span style={{ color: "red" }}>Terusan</span>
                                }
                                <h6
                                    style={{ marginBottom: 4 }}
                                    className='text-green-accent'
                                    >
                                        {data.pull.data?.info.from === user.username ? "Kamu" : data.pull.data?.info.from}
                                </h6>
                                <p>{data.pull.data?.msg}</p>
                            </div>
                        )
                    }
                    {/* Message Reply Cards End */}


                    {/* Message content */}
                    <div className='flex w-full items-end gap-2'>
                        <p className='px-1 w-full pb-2'>{data.msg}</p>
                        <span
                            style={{
                                textAlign: data.info.from === user.username ? "right" : "left"
                            }}
                            className='text-icon-color text-[12px] w-fit px-1'
                        >
                            {getTimeMsg(data.info.timestamp)}
                        </span>
                    </div>
                    {/* Message content */}


                </div>
                {/* Message Body End */}

            </div>
        </div>
    )
}

export default MessageCard
