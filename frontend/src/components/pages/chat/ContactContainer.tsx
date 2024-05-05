// import React from 'react'
import style from "./styles/contact.module.css"
import SearchContact from './fragments/contact/SearchContact';
import ContactCard from './fragments/cards/ContactCard';
import _contact_dummy from "../../assets/json/contact.json"
import HeaderContact from "./fragments/contact/HeaderContact";
import { useContact } from "@contexts/chat/ContactContext";
import ArchiveContact from "./fragments/contact/ArchiveContact";


function ContactContainer() {
    const { contact, seacrh } = useContact();
    return (
        <div className={style.contact_container}>
            <HeaderContact />
            <SearchContact />
            <ArchiveContact />
            <div className={style.contact_list}>
                {
                    seacrh.status ?
                        seacrh.data.map((contact, i) => <ContactCard key={i} data={contact} />) :
                        contact.map((contact, i) => <ContactCard key={i} data={contact} />)
                }
            </div>
        </div>
    )
}

export default ContactContainer
