import React, { useState } from 'react'
import HeaderContactLayout from '../HeaderContactLayout'
import { useContact } from '@contexts/chat/ContactContext'
import ContactGrupCard from './components/ContactGrupCard';
import { ContactType } from '@contexts/chat/ChatContext';
import GrupListCard from './components/GrupListCard';
import Icon from '../../../../../../constants/icons';
import DetailGroup from './child/DetailGroup';
import ContactContentLayout from '../ContactContentLayout';
import { useSession } from '@providers/AuthProvider';
import { NewGroupType, useGroupContact } from '@contexts/chat/contact/GroupContactContext';

function NewGrupContentContact() {

    const { contact } = useContact();
    const { fn: { handleNewGroup } } = useGroupContact();
    const { user } = useSession()
    const [tglChlld, setTllChild] = useState(false);
    const [member, setMember] = useState<ContactType[]>([]);
    const [group, setGroup] = useState<{ name: string, bio: string }>({
        name: "",
        bio: ""
    });


    function handleMember(contact: ContactType) {
        const exist = member.find(con => con.username === contact.username);

        if (!exist) {
            setMember(pv => [contact, ...pv])
        } else {
            setMember(pv => pv.filter(con => con.username !== exist.username))
        }
    }

    function handleGroup(name: string, value: string) {
        setGroup(pv => ({
            ...pv,
            [name]: value
        }))
    }

    function handleCreate() {
        if (!group.name) return
        if (!user.id) return
        const payload: NewGroupType = {
            ...group,
            member: [
                ...member.map(foo => ({
                    username: foo.username,
                    role: "member"
                })),
                {
                    username: user.username!,
                    role: "admin"
                }
            ]
        }

        handleNewGroup(payload, (err) => {
            if(err){
                alert(err)
            }
        })

    }

    return (
        tglChlld ?
            <DetailGroup
                back={setTllChild}
                handleGroup={handleGroup}
                handleCreate={handleCreate}
            /> : (
                <ContactContentLayout>
                    <HeaderContactLayout
                        label='Add group members'
                    />

                    <div className='w-full flex flex-col pt-6 text-white min-h-[77vh]  justify-between'>

                        <div className='flex flex-col overflow-hidden'>
                            <div className='px-8 flex gap-2 w-full flex-wrap max-h-[20vh] overflow-y-scroll'>
                                {
                                    member.map(data => (
                                        <GrupListCard data={data} action={handleMember} />
                                    ))
                                }
                            </div>


                            <div className='px-8 pb-6'>
                                <input type="text" className='w-full bg-transparent border-b-2 border-y-hover-color px-1 py-1  outline-none' placeholder='Seacrch name' />
                            </div>


                            <div className={`flex flex-col gap-4 px-8 ${member.length >= 9 ? "max-h-[30vh]" : "max-h-[55vh]"} overflow-y-scroll`}>
                                {
                                    contact.sort((a, b) => a.username.localeCompare(b.username)).map(data => {
                                        const exist = member.find(con => con.username === data.username);
                                        return !exist && (
                                            <button onClick={() => handleMember(data)}>
                                                <ContactGrupCard data={data} />
                                            </button>
                                        )
                                    })
                                }
                            </div>


                        </div>

                        {
                            member.length >= 1 && (
                                <div className='w-full flex justify-center pb-4 bg-bg-secondary py-5'>
                                    <button
                                        onClick={() => setTllChild(pv => !pv)}
                                        className='bg-green-accent p-1 rounded-full'
                                    >
                                        {Icon.arrow_right({
                                            size: 35,
                                            color: "#fff"
                                        })}
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </ContactContentLayout>
            )
    )
}

export default NewGrupContentContact
