import  { ReactNode } from 'react'

export default function MessageContentLayout({ children }: { children: ReactNode }) {
    return (
        <div className='text-white bg-bg-secondary mb-16 h-fit w-[640px] overflow-hidden border-l-2 border-bg-primary'>
            {children}
        </div>
    )
}
