import React, { useState } from 'react'
import HeaderContactLayout from '../HeaderContactLayout';
import { useContact } from '@contexts/chat/ContactContext';
import ContactGrupCard from '../NewGrupContent/components/ContactGrupCard';
import NewGrupContentContact from '../NewGrupContent/NewGrupContentContact';

function NewMessage() {

    const { contact, tgl: { fn: { setTglContent } } } = useContact()
    const [tglGroup, setTglGroup] = useState(false);

    return (
        <div className='fixed min-h-screen w-[31%] left-0 top-0 bg-bg-secondary'>
            <HeaderContactLayout
                label='New Chat'
            />

            <div className='w-full flex flex-col pt-6 text-white min-h-[77vh]  justify-between'>

                <div className='flex flex-col overflow-hidden'>

                    <div className='px-8 pb-6'>
                        <input type="text" className='w-full rounded-md bg-hover-color px-4 py-1  outline-none' placeholder='Seacrch name' />
                    </div>

                    <div className='py-6 px-8'>
                        <div>
                            <button
                                onClick={() => setTglContent("group")}
                            >New Group</button>
                        </div>
                    </div>

                    <div className={`flex flex-col gap-4 px-8 max-h-[55vh] overflow-y-scroll`}>
                        {
                            contact.sort((a, b) => a.username.localeCompare(b.username)).map(data => <ContactGrupCard data={data} />)
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}

export default NewMessage
