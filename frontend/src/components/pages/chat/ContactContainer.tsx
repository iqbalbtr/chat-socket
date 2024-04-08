// import React from 'react'
import style from "./styles/contact.module.css"
import SearchContact from './fragments/contact/SearchContact';
import ContactCard from './fragments/cards/ContactCard';
import _contact_dummy from "../../assets/json/contact.json"
import HeaderContact from "./fragments/contact/HeaderContact";
import { useContact } from "@contexts/chat/ContactContext";


function ContactContainer() {
    const { contact } = useContact();
    return (
        <div className={style.contact_container}>
            <HeaderContact />
            <SearchContact />
            <div className={style.contact_list}>
                {
                    contact.map((contact, i) => <ContactCard key={i} data={contact} />)
                }
            </div>
        </div>
    )
}

export default ContactContainer
