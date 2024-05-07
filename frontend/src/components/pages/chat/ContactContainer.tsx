// import React from 'react'
import SwitchLayout from "@components/layouts/SwitchLayout";
import _contact_dummy from "../../assets/json/contact.json"
import MainContentContaxt from './fragments/contact/mainContent/MainContentContaxt';
import { useContact } from "@contexts/chat/ContactContext";
import ProfileContentContact from "./fragments/contact/profileContent/ProfileContentContact";
import StatusContentContact from "./fragments/contact/statusContent/StatusContentContact";
import NewGrupContentContact from "./fragments/contact/NewGrupContent/NewGrupContentContact";
import SettingContentContact from "./fragments/contact/settingContent/SettingContentContact";
import NewMessage from "./fragments/contact/newMessage/NewMessage";


function ContactContainer() {

    const { tgl: { tglContent } } = useContact()


    return (
        <section className="w-[45%] max-w-[45%] relative bg-bg-secondary">

            {/* Contact Section main contnt */}
            <MainContentContaxt />
            {/* Contact Section main contnt */}

            <SwitchLayout
                name={tglContent}
                data={[
                    {
                        name: "profile",
                        children: <ProfileContentContact />
                    },
                    {
                        name: "status",
                        children: <StatusContentContact />
                    },
                    {
                        name: "group",
                        children: <NewGrupContentContact />
                    },
                    {
                        name: "settings",
                        children: <SettingContentContact />
                    },
                    {
                        name: "new_message",
                        children: <NewMessage />
                    }
                ]}
            />

        </section>
    )
}

export default ContactContainer
