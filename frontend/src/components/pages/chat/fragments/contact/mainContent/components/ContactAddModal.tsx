import React from 'react'
import style from "../../../../styles/contact.module.css"
import { useChat } from '@contexts/chat/ChatContext'
import { useContact } from '@contexts/chat/ContactContext';

function ContactAddModal({ username }: { username?: string }) {

    const { fn: { addContact } } = useContact();
    const form = React.useRef(null);
    const { tgl: { fn: { setTglHead } } } = useChat()

    function handleAdd(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const inputs = new FormData(form.current!);
        const username = inputs.get("username") as string;
        const name = inputs.get("name") as string;

        if (username && name) {
            addContact({ name: name, username: username }, (err) => {
                if (!err) {         
                    setTglHead(pv => !pv);
                }
            })
        }
    }

    return (
        <form ref={form} className={style.add_contact_container}>
            <h3>Tambah Kontak Baru</h3>
            <div className={style.add_contact_field}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="" defaultValue={username} />
            </div>
            <div className={style.add_contact_field}>
                <label htmlFor="name">Nama</label>
                <input type="text" name='name' />
            </div>
            <button onClick={(e) => handleAdd(e)}>Tambah</button>
        </form>
    )
}

export default ContactAddModal
