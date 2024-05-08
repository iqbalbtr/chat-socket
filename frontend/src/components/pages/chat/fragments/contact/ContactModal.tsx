import React from 'react'
import style from "../../styles/contact.module.css"
import { ContactType, useChat } from '@contexts/chat/ChatContext';
import { useContact } from '@contexts/chat/ContactContext';

function ContactModal({ setTgl }: { setTgl: React.Dispatch<React.SetStateAction<boolean>> }) {

    const { current, fn: { removeCurrent } } = useChat();
    const [contact, setContact] = React.useState<Partial<ContactType>>(current);
    const [tglAdd, setTglAdd] = React.useState<boolean>(false);
    const input = React.useRef<HTMLInputElement>(null);
    const inputFocus = document.activeElement === input.current;
    const { fn: { removeContact, updateContact } } = useContact();

    function handleEdit(e: string) {
        setContact({
            ...contact,
            name: e
        });
    }

    return (
        <div className={style.contact_modal_container}>
            <div className={style.contact_modal_profile}>
                <span>{contact.username?.charAt(0).toUpperCase()}</span>
                <p>@{current.username}</p>
                <p style={{fontSize: "14px"}}>Last active 12:22</p>
                <input ref={input} type="text" onChange={(e) => handleEdit(e.target.value)} defaultValue={contact.name} />
            </div>
            <div className={style.contact_modal_action}>
                {
                    contact.new &&
                    <button
                        onClick={() => setTglAdd(true)}
                    >
                        Tambah
                    </button>
                }
                {
                    inputFocus && (
                        <button 
                        onClick={() => updateContact({id: contact.id!, name: contact.name!}, (err) => {
                            if(!err){

                            }
                        })}
                        >
                            Edit
                        </button>
                    )
                }
                <button
                    onClick={() => removeContact(contact.username!, (err) => {
                        if (!err) {
                            setTgl(pv => !pv);
                            removeCurrent();
                        }
                    })}
                >
                    Hapus
                </button>
                <button>
                    Bagikan
                </button>
            </div>
        </div>
    )
}

export default ContactModal
