import React from 'react'
import style from "../../styles/chat.module.css"
import Modal from '@components/core/Modal';
import MessageMenuList from '../core/MessageMenuList';
import useCookie from '@hooks/useCookie';

type ChatType = {
    id: number,
    username: string;
    from: string;
    to: string;
    msg: string;
    timestamp: string;
    read: boolean;
}

function MessageCard({
    data
}: {
    data: ChatType
}) {

    const [tglChat, setTglChat] = React.useState(false);
    const user = "Alice";

    return (
        <div
            onClick={() => setTglChat(pv => !pv)}
            className={style.message_card}
            style={{
                justifyContent: data.username === user ? "flex-end" : "flex-start"
            }}
        >
            {
                data.username !== user &&
                <span className={style.message_card_profile}>{data.username.charAt(0).toUpperCase()}</span>
            }
            <div>
                <h5
                    style={{
                        textAlign: data.username === user ? "right" : 'left'
                    }}
                >{data.username === user ? "You" : data.username}</h5>
                <div className={style.message_card_container}>
                    <p>{data.msg}</p>
                    <span>12:55</span>
                    {
                        tglChat && (
                            <Modal
                                open={tglChat}
                                setOpen={setTglChat}
                                filter={false}
                                styles={{
                                    right: data.username !== user ? "-10px" : "",
                                    left: data.username === user ? "-90px" : ""
                                }}
                            >
                                <MessageMenuList />
                            </Modal>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default MessageCard
