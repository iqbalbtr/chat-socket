import React from 'react'
import style from "../../styles/chat.module.css"
import Modal from '@components/core/Modal';
import MessageMenuList from '../core/MessageMenuList';
import { useSession } from '@providers/AuthProvider';
import { MsgType } from '@contexts/chat/ChatContext';

function MessageCard({
    data
}: {
    data: MsgType
}) {

    const [tglChat, setTglChat] = React.useState(false);
    const { user } = useSession();
    const current: string = "private"

    function getTimeMsg(date: number){
        const now = new Date(date);

        return `${now.getHours()}:${now.getMinutes()}`
    }

    return (
        <div
            onClick={() => setTglChat(pv => !pv)}
            className={style.message_card}
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
                        >{data.info.from === user.username ? "You" : data.info.from}</h5>
                    )
                }
                <div
                    className={style.message_card_container}
                    style={{
                        position: "relative",
                        borderRadius: user.username === data.info.from ? "12px 12px 0" : "12px 12px 12px 0px"
                    }}
                >
                    {
                        data.pull.status && (
                            <div style={{
                                padding: 6,
                                marginBottom: 3,
                                border: "1px solid var(--outline-color)",
                                borderRadius: 6,
                            }}>
                                {
                                    data.fwd && data.fwd !== current && <span style={{color: "red"}}>Terusan</span>
                                }
                                <h6 style={{marginBottom: 4}}>{data.pull.data?.info.from === user.username ? "Kamu" : data.pull.data?.info.from}</h6>
                                <p>{data.pull.data?.msg}</p>
                            </div>
                        )
                    }
                    <p>{data.msg}</p>
                    <span>{getTimeMsg(data.info.timestamp)}</span>
                    {
                        tglChat && (
                            <Modal
                                open={tglChat}
                                setOpen={setTglChat}
                                filter={false}
                                center={false}
                                styles={{
                                    right: data.info.from !== user.username ? "" : "85px",
                                    left: data.info.from === user.username ? "" : "106%",
                                }}
                            >
                                <MessageMenuList  msg={data} setTgl={setTglChat} />
                            </Modal>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default MessageCard
