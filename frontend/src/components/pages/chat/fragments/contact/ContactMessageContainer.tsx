import Modal from '@components/core/Modal';
import React from 'react'
import ContactAddModal from './ContactAddModal';
import { ContactType, useChat } from '@contexts/chat/ChatContext';
import style from "../../styles/contact.module.css"
import { useContact } from '@contexts/chat/ContactContext';


function ContactMessageContainer() {

    const { current, fn: { removeCurrent }, tgl: { fn: { setTglModal } } } = useChat();
    const [tglAdd, setTglAdd] = React.useState<boolean>(false);
    const { contact,  fn: { removeContact, updateContact } } = useContact();

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
        <div
            style={{
                minHeight: "100%",
                width: "450px",
            }}
        >
            <div className={style.contact_modal_container}>
                <div className={style.contact_modal_header}>
                    <button
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={() => setTglModal(pv => !pv)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24" id="times">
                            <path fill="#000"
                                d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                        </svg>
                    </button>

                    <h3>Info kontak</h3>
                </div>
                <div className={style.contact_modal_profile}>
                    <span>{current.username?.charAt(0).toUpperCase()}</span>
                    <p>@{current.username}</p>
                    <p style={{ fontSize: "14px" }}>{getLastActive()}</p>
                    <p>{current.name}</p>
                </div>
                <div className={style.contact_modal_action_container}>
                    <h3 style={{ padding: 8 }}>Menu</h3>
                    <div className={style.contact_modal_action}>
                        {
                            current.new &&
                            <button
                                onClick={() => setTglAdd(true)}
                            >
                                Tambah
                            </button>
                        }
                        <button
                            onClick={() => updateContact({ id: current.id!, name: current.name! }, (err) => {
                                if (!err) {

                                }
                            })}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => removeContact(current.username!, (err) => {
                                if (!err) {
                                    removeCurrent();
                                    setTglModal(pv => !pv)
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
                <Modal
                    open={tglAdd}
                    setOpen={setTglAdd}
                    styles={{
                        left: "0",
                    }}
                >
                    <ContactAddModal username={current.username} />
                </Modal>
            </div>
        </div>
    )
}

export default ContactMessageContainer
