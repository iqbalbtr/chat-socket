import React from 'react'
import HeaderContact from './components/HeaderContact'
import SearchContact from './components/SearchContact'
import ArchiveContact from './components/ArchiveContact'
import { useContact } from '@contexts/chat/ContactContext';
import ContactCard from '../../cards/ContactCard';

function MainContentContaxt() {

    const { contact, seacrh } = useContact();

    return (
        <div>
            {/* NavBar Contact start */}
            <HeaderContact />
            {/* NavBar Contact end */}

            {/* Contact body start */}
            <div>
                <SearchContact />
                <ArchiveContact />
                <div className="flex flex-col h-[77vh] px-2 overflow-y-scroll">
                    {
                        seacrh.status ?
                            seacrh.data.map((contact, i) => <ContactCard key={i} data={contact} />) :
                            contact.map((contact, i) => <ContactCard key={i} data={contact} />)
                    }
                </div>
            </div>
            {/* Contact body end */}
        </div>
    )
}

export default MainContentContaxt
