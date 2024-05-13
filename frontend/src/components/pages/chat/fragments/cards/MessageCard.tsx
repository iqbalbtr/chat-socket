import React, { useEffect, useState } from 'react'
import style from "../../styles/chat.module.css"
import { useSession } from '@providers/AuthProvider';
import { MsgType } from '@contexts/chat/ChatContext';
import { colors } from '../../../../../constants/color';
import MessageCardListMenu from '../listMenu/MessageCardListMenu';
import ModalTransparent from '@components/core/ModalTransparent';
import { useMessage } from '@contexts/chat/MessageContext';
import Cheked from './Cheked';
import { useSelectMessage } from '@contexts/chat/message/SelectMessageContext';
import { getHourTime } from '@utils/timeNotif';

function MessageCard({
    data
}: {
    data: MsgType
}) {

    const [tglList, setTglList] = useState(false);
    const { select, fn: { handleSelect } } = useSelectMessage();
    const { user } = useSession();
    const current: string = "private";

    function getTimeMsg(date: number) {
        const now = new Date(date);

        return `${now.getHours()}:${now.getMinutes()}`
    }

    const getExistForward = select.data.find(msg => msg.id === data.id) ? true : false;

    return (
        <div
            id={data.id}
            onClick={() => select.status ? handleSelect(data) : null}
            className={`w-full relative flex my-2 text-white ${getExistForward && "bg-bg-primary"} ${select.data.length >= 1 && "cursor-pointer"}`}
            style={{
                justifyContent: data.info.from === user.username ? "flex-end" : "flex-start"
            }}
        >


            {
                //  Action select.data if message exist on select.data array and msg from same xurrent user 
                select.status && data.info.from !== user.username && (
                    <Cheked value={getExistForward} />
                )
                // Action select.data if message exist on select.data array
            }



            {/* {
                data.info.from !== user.username && current === "group" &&
                <span className={style.message_card_profile}>{data.info.from.charAt(0).toUpperCase()}</span>
            } */}



            {/* Outer container message start */}
            <div>
                {/* {
                    current === "group" && (
                        <h5
                            style={{
                                textAlign: data.info.from === user.username ? "right" : 'left'
                            }}
                        >
                            {data.info.from === user.username ? "You" : data.info.from}
                        </h5>
                    )
                } */}


                {/* Message Body Start */}
                <div
                    className={`${data.info.from === user.username ? "bg-green-primary" : "bg-hover-color"} flex flex-col py-1 px-1 max-w-[36rem] group `}
                    style={{
                        position: "relative",
                        borderRadius: user.username === data.info.from ? "12px 12px 0" : "12px 12px 12px 0px"
                    }}
                >


                    {/* Toggle list message menu button start */}
                    {
                        select.data.length === 0 && (
                            <button
                                onClick={() => setTglList(pv => !pv)}
                                className={`absolute right-0 shadow-lg top-0 hidden rounded-full ${user.username === data.info.from ? "bg-green-primary" : "bg-hover-color"} hidden group-hover:flex`}>
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
                            </button>
                        )
                    }
                    {/* Toggle list message menu button start */}


                    {/* Modal List menu message start*/}
                    {
                        tglList && (
                            <div className={`absolute ${data.info.from !== user.username ? "left-full ml-2" : "right-full mr-2"}`}>
                                <div className='fixed top-0 z-10 left-0 min-h-screen w-full' onClick={() => setTglList(pv => !pv)}></div>
                                <MessageCardListMenu
                                    msg={data}
                                    setTgl={setTglList}
                                />
                            </div>
                        )
                    }
                    {/* Modal List menu message End*/}





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
                            {getHourTime(data.info.timestamp)}
                        </span>
                    </div>
                    {/* Message content */}


                </div>
                {/* Message Body End */}


            </div>
            {/* Outer container message end */}



            {
                //  Action select.data if message exist on select.data array and msg from not equal xurrent user 
                select.status && data.info.from === user.username && (
                    <Cheked value={getExistForward} />
                )
                //  Action select.data if message exist on select.data array 
            }


        </div>
    )
}

export default MessageCard
