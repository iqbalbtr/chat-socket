import React from 'react'
import style from "../styles/chat.module.css"
import Modal from '@components/core/Modal';
import ContactMenuList from './core/ContactMenuList';

function ChatHeader() {

    const [tglHeader, setTglHeader] = React.useState(false);

    return (
        <div className={style.header_chat}>
            <div className={style.header_chat_profile}>
                <span>A</span>
                <div>
                    <h3>Iqbal</h3>
                    <span>Last active 12:45</span>
                </div>
            </div>
            <div>
                <button
                    style={{
                        position: "relative",
                        border: "none",
                        background: "transparent"
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
                        styles={{
                            bottom: 0,
                            left: "-100px",
                        }}
                    >
                        <ContactMenuList />
                    </Modal>
                </button>
            </div>
        </div>
    )
}

export default ChatHeader
