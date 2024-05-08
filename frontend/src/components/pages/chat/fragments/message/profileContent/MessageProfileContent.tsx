import React from 'react'
import { useChat } from '@contexts/chat/ChatContext';
import { useContact } from '@contexts/chat/ContactContext';
import { colors } from '../../../../../../constants/color';
import { useMessage } from '@contexts/chat/MessageContext';
import EditProfileMessage from './chiild/EditProfileMessage';


function MessageProfileContent() {

    const { current, fn: { removeCurrent } } = useChat();
    const { router: { fn: { handleMessageRouter } } } = useMessage();
    const [tglEdit, setTglEdit] = React.useState<boolean>(false);
    const { contact, fn: { removeContact, updateContact } } = useContact();

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
        tglEdit ?
            <EditProfileMessage back={() => setTglEdit(false)} /> : (
                <div
                    className='border-2 border-bg-primary'
                    style={{
                        width: "640px",
                        overflow: "hidden"
                    }}
                >
                    <div className='text-white bg-bg-secondary mb-16 h-fit'>
                        <div className={`bg-bg-primary flex gap-2 px-3 items-center py-3.5`}>
                            <button
                                style={{
                                    cursor: "pointer"
                                }}
                                onClick={() => handleMessageRouter("back")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24" id="times">
                                    <path fill={colors.ICON_COLOR}
                                        d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                                </svg>
                            </button>

                            <h3>Info kontak</h3>
                        </div>
                        <div className='w-full max-h-[95vh] overflow-scroll'>
                            <div className=" w-full flex flex-col justify-center items-center py-16">
                                <span
                                    className='w-[190px] aspect-square rounded-full bg-icon-color flex justify-center items-center text-3xl'
                                >
                                    {current.username?.charAt(0).toUpperCase()}
                                </span>
                                <p
                                    className='flex pt-6 text-2xl'
                                >
                                    @{current.username}
                                </p>
                                <p
                                    className='text-icon-color'
                                    style={{ fontSize: "14px" }}
                                >{getLastActive()}</p>
                                <p>{current.name}</p>
                            </div>
                            <div className="bg-[#0c1317] py-3 flex flex-col gap-3 pb-16">
                                <div className='flex flex-col gap-2 py-4 px-6 bg-bg-secondary'>
                                    <h3 className='text-icon-color '>About</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt!</p>
                                </div>
                                <div className='flex flex-col gap-2 py-2 px-6 bg-bg-secondary min-h-full'>
                                    <div className='flex flex-col gap-4 py-4 bg-bg-secondary items-start min-h-full'>
                                        {
                                            current.new &&
                                            <button
                                                onClick={() => setTglEdit(true)}
                                            >
                                                Tambah
                                            </button>
                                        }
                                        <button
                                            onClick={() => setTglEdit(true)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => removeContact(current.username!, (err) => {
                                                if (!err) {
                                                    removeCurrent();
                                                    handleMessageRouter("back")
                                                }
                                            })}
                                        >
                                            Hapus
                                        </button>
                                        <button>
                                            Bagikan
                                        </button>
                                        <button>
                                            Arsipkan
                                        </button>
                                    </div>

                                </div>
                                <div className='flex flex-col gap-2 py-4 px-6 bg-bg-secondary items-start pb-6'>
                                    <button>Block</button>
                                    <button>Delete Chat</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )
    )
}

export default MessageProfileContent
