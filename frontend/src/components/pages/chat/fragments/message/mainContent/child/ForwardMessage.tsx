import { useContact } from '@contexts/chat/ContactContext';
import { useMessage } from '@contexts/chat/MessageContext';
import React from 'react'
import Icon from '../../../../../../../constants/icons';
import { colors } from '../../../../../../../constants/color';
import ContactGrupCard from '../../../contact/NewGrupContent/components/ContactGrupCard';
import { useSelectMessage } from '@contexts/chat/message/SelectMessageContext';

function ForwardMessage() {


    const { contact } = useContact();
    const { select } = useSelectMessage();


    return (
        <div>
            <div className="w-full px-6 pt-6 bg-bg-secondary">
                <div className="relative">
                    <button className="absolute left-2 top-1/2 -translate-y-1/2">
                        {Icon.arrow_left({
                            size: 25,
                            color: colors.GREEN_PRIMARY
                        })}
                    </button>
                    <input type="text" className="p-1 pl-6 bg-bg-primary w-full rounded-md" />
                </div>
                <div className="flex flex-col pt-6 gap-6 text-white h-[65vh] overflow-y-scroll">
                    <h3 className="text-green-primary text-xl">RECENTS CHAT</h3>
                    {
                        contact.map(con => (
                            <ContactGrupCard data={con} />
                        ))
                    }
                    {
                        contact.map(con => (
                            <ContactGrupCard data={con} />
                        ))
                    }
                    {
                        contact.map(con => (
                            <ContactGrupCard data={con} />
                        ))
                    }
                    {
                        contact.map(con => (
                            <ContactGrupCard data={con} />
                        ))
                    }
                </div>
            </div>
            <div className="px-3 py-2 text-white flex justify-between items-center bg-bg-primary">
                <span className="line-clamp-1 px-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, labore! Veniam, minus.</span>
                <button>
                    {
                        Icon.arrow_right({
                            size: 45,
                            color: "#fff",
                            classname: "p-1 rounded-full bg-green-accent"
                        })
                    }
                </button>
            </div>
        </div>
    )
}

export default ForwardMessage
