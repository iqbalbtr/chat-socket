import React from 'react'
import style from "./styles/contact.module.css"
import SearchContact from './fragments/SearchContact';
import ContactCard from './fragments/cards/ContactCard';
import _contact_dummy from "../../assets/json/contact.json"


function ContactContainer() {
    return (
        <div className={style.contact_container}>
            <SearchContact />
            <div className={style.contact_list}>
                {
                    _contact_dummy.map(contact => <ContactCard key={contact.id} data={contact} />)
                }
            </div>
        </div>
    )
}

export default ContactContainer
