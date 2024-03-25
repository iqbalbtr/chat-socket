import React from 'react'
import style from "../../styles/contact.module.css";

type ContactType = {
    id: number,
    username: string,
    name: string
}

function ContactCard({
    data
}:{
    data: ContactType
}) {
    return (
        <div className={style.contact_card}>
            <div>
                <span>{data.name.charAt(0).toUpperCase()}</span>
                <div>
                    <h3>{data.name}</h3>
                    <p style={{fontSize: 14}}>Hi!</p>
                </div>
            </div>
        </div>
    )
}

export default ContactCard
