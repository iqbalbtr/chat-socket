import { colors } from '../../../../../../../constants/color'
import Icon from '../../../../../../../constants/icons'
import { useChat } from '@contexts/chat/ChatContext'
import FieldEditContact from '../components/FieldEditContact'
import {  useRef } from 'react';
import { useContact } from '@contexts/chat/ContactContext';
import { useRouterMessage } from '@contexts/chat/message/RouterMessageContext';

function EditProfileMessage({ back }: { back: () => void }) {

    const { current } = useChat();
    const { contact } = useContact();
    const { fn: { updateContact} } = useContact();
    const { fn: { handleRouterMessage} } = useRouterMessage();
    const currentContact = contact.find(foo => foo.username === current?.username)

    const form = useRef<HTMLFormElement | null>(null);

    async function handlerEdit() {
        const data = new FormData(form.current!);

        const payload = {
            id: currentContact?.id!,
            firstname: data.get("first_name") as string,
            lastname: data.get("last_name") as string
        }

        await updateContact(payload, err => {
            if(!err){
                back()
                handleRouterMessage("idle")
            }
        })
    }

    return (
        <div
            style={{
                width: "640px",
                overflow: "hidden"
            }}
        >
            <div className='text-white bg-bg-secondary mb-16 h-fit min-h-screen'>
                <div className={`bg-bg-primary flex gap-2 px-3 items-center py-3.5`}>
                    <button
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={back}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24" id="times">
                            <path fill={colors.ICON_COLOR}
                                d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                        </svg>
                    </button>

                    <h3>Edit Kontak</h3>
                </div>

                <div className='flex w-full flex-col items-center justify-center py-12'>
                    <span className='w-[190px] aspect-square rounded-full bg-gray-500'></span>
                    <p className='text-icon-color pt-3'>{currentContact?.username}</p>
                </div>

                <form ref={form}>
                    <div className="flex flex-col gap-2 px-10 py-4 text-white">
                        <div className="flex flex-col items-start gap-2 py-1">
                            <h2 className="text-sm">First name</h2>
                            <FieldEditContact name='first_name' defaultValue={currentContact?.name.split("%2f")[0]} />
                        </div>
                        <div className="flex flex-col items-start gap-2 py-1">
                            <h2 className="text-sm">Last name</h2>
                            <FieldEditContact name='last_name' defaultValue={currentContact?.name.split("%2f")[1]} />
                        </div>
                    </div>

                    <div className="py-12 flex justify-center">
                        <button onClick={handlerEdit} type='button'>
                            {Icon.check({
                                size: 45,
                                color: "#fff",
                                classname: "p-1 rounded-full bg-green-accent"
                            })}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditProfileMessage
