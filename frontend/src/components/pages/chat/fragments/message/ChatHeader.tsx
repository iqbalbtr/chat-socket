import React from 'react'
import style from "../../styles/chat.module.css"
import Modal from '@components/core/Modal';
import ContactMenuList from '../core/ContactMenuList';
import { useChat } from '@contexts/chat/ChatContext';
import { useContact } from '@contexts/chat/ContactContext';

function ChatHeader() {

    const [tglHeader, setTglHeader] = React.useState(false);
    const { tgl: { fn: { setTglModal } } } = useChat();
    const { contact } = useContact();
    const { current } = useChat();

    function getLastActive() {
        const find = contact.find(con => con.username === current.username);
        if(!find) return;
        if (!find.lastActive) {
            return ""
        } else {
            if (find.lastActive.status) {
                return 'online'
            } else {
                const date = new Date(find.lastActive.time);
                return `Last active  ${date.getHours()}:${date.getMinutes()}`
            }
        }
    }


    return (
        <div className={style.header_chat}>
            <div className={style.header_chat_profile} onClick={() => setTglModal(pv => !pv)}>
                <span>{current.name?.charAt(0).toUpperCase()}</span>
                <div>
                    <h3>{current.name}</h3>
                    <span>{getLastActive()}</span>
                </div>
            </div>
            <div>
                <div
                    style={{
                        position: "relative",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer"
                    }}
                    onClick={() => setTglHeader(pv => !pv)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={25} viewBox="0 0 24 24" id="ellipsis-v">
                        <path fill="#000"
                            d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"></path>
                    </svg>
                    <Modal
                        open={tglHeader}
                        setOpen={setTglHeader}
                        filter={false}
                        center={false}
                        styles={{
                            right: "120px"
                        }}
                    >
                        <ContactMenuList />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
