import { ContactType } from '@contexts/chat/ChatContext'
import React from 'react'

function ContactGrupCard({ data }: { data: ContactType }) {

    return (
        <div className='w-full flex gap-3 items-center'>
            <span
                className='w-[50px] aspect-square bg-gray-500 flex justify-center items-center text-2xl rounded-full mt-2'
            >
                {data.name.charAt(0).toUpperCase()}
            </span>
            <div className='flex pl-2 flex-col items-start gap-1 w-full border-t-[1px] border-hover-color pt-2'>
                <h3>{data.name.split("%2f").join(" ")}</h3>
                <p className='text-sm text-left text-icon-color line-clamp-1'>{data.bio}</p>
            </div>
        </div>
    )
}

export default ContactGrupCard
