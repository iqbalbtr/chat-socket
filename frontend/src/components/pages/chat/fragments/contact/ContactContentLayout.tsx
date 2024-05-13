import { ReactNode } from "react"

function ContactContentLayout({ children }: { children: ReactNode }) {
    return (
        <div className='fixed min-h-screen w-[31%] left-0 top-0 bg-bg-secondary'>
            {children}
        </div>
    )
}

export default ContactContentLayout
