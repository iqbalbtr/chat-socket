import React from 'react'
import style from "../../styles/chat.module.css"
import { useChat } from '@contexts/chat/ChatContext';
import { useMessage } from '@contexts/chat/MessageContext';
import MessagePullCard from '../cards/MessagePullCard';
import ClipMenu from './ClipMenu';
import Modal from '@components/core/Modal';
import { colors } from '../../../../../constants/color';


function SendMessage() {


    const [tglClip, setTglClip] = React.useState<boolean>(false);
    const { current } = useChat();
    const [input, setInput] = React.useState("");
    const { pull, fn: { sendMessage, removePull } } = useMessage();

    function handleSending() {
        return sendMessage({
            input: input,
            to: current.username!,
            type: "private",
            pull: pull?.id ? pull : undefined
        }, (status) => {
            if (status) {
                setInput("");
                if (pull) {
                    removePull()
                }
            }
        })
    }

    return (
        <div >
            <div
                className="flex justify-center items-center bg-bg-primary"
                style={{
                    bottom: pull ? "60px" : "0px"
                }}
            >
                {
                    pull && <MessagePullCard />
                }
                <div className="w-full flex gap-5 justify-center items-center p-4">
                    <button
                        onClick={() => setTglClip(pv => !pv)}
                    >
                        {
                            tglClip ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 24 24" id="times">
                                    <path fill="#000"
                                        d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    id="plus"
                                    width={25}
                                    height={25}
                                >
                                    <path
                                        fill={colors.ICON_COLOR}
                                        d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"
                                    >
                                    </path>
                                </svg>
                            )
                        }
                    </button>
                    <input
                        type="text"
                        value={input} onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSending()}
                        className={"w-full bg-hover-color p-1 rounded-md text-white outline-none"}
                    />
                    <button
                        onClick={handleSending}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 24 24" id="message">
                            <path fill={colors.ICON_COLOR}
                                d="M20.34,9.32l-14-7a3,3,0,0,0-4.08,3.9l2.4,5.37h0a1.06,1.06,0,0,1,0,.82l-2.4,5.37A3,3,0,0,0,5,22a3.14,3.14,0,0,0,1.35-.32l14-7a3,3,0,0,0,0-5.36Zm-.89,3.57-14,7a1,1,0,0,1-1.35-1.3l2.39-5.37A2,2,0,0,0,6.57,13h6.89a1,1,0,0,0,0-2H6.57a2,2,0,0,0-.08-.22L4.1,5.41a1,1,0,0,1,1.35-1.3l14,7a1,1,0,0,1,0,1.78Z"></path>
                        </svg>
                    </button>
                    <Modal
                        open={tglClip}
                        setOpen={setTglClip}
                        filter={false}
                    >
                        <ClipMenu />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default SendMessage
