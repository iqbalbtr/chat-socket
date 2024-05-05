import React from 'react'
import style from "../../styles/chat.module.css"
import Modal from '@components/core/Modal';
import ContactMenuList from '../core/ContactMenuList';
import { useChat } from '@contexts/chat/ChatContext';
import { useContact } from '@contexts/chat/ContactContext';
import { colors } from '../../../../../constants/color';

function ChatHeader() {

    const [tglHeader, setTglHeader] = React.useState(false);
    const { tgl: { fn: { setTglModal } } } = useChat();
    const { contact } = useContact();
    const { current } = useChat();

    function getLastActive() {
        const find = contact.find(con => con.username === current.username);
        if (!find) return;
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
        <div className={`w-full flex justify-between py-2.5 px-5 bg-bg-primary text-white items-center relative`}>
            <div className={style.header_chat_profile} onClick={() => setTglModal(pv => !pv)}>
                <span className='w-[45px] aspect-square bg-gray-400'>{current.name?.charAt(0).toUpperCase()}</span>
                <div>
                    <h3 className='font-semibold'>{current.name}</h3>
                    <span>{getLastActive()}</span>
                </div>
            </div>
            <div className='flex justify-center items-center gap-4'>
                <div>
                    <svg
                        width={24}
                        height={24}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="search">
                        <path
                            fill={colors.ICON_COLOR}
                            d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
                        ></path></svg>
                </div>
                <div
                    style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer"
                    }}
                    onClick={() => setTglHeader(pv => !pv)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={25} viewBox="0 0 24 24" id="ellipsis-v">
                        <path fill={colors.ICON_COLOR}
                            d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"></path>
                    </svg>
                    <Modal
                        open={tglHeader}
                        setOpen={setTglHeader}
                        filter={false}
                        center={false}
                        styles={{
                            right: "-73%",
                            top: "100%"
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
