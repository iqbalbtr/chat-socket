import { useContact } from "@contexts/chat/ContactContext";
import HeaderContactLayout from "../HeaderContactLayout"
import ContactGrupCard from "../NewGrupContent/components/ContactGrupCard";
import { useChat } from "@contexts/chat/ChatContext";
import ContactCard from "../../cards/ContactCard";

function ArchiveContactConten() {

    const { contact } = useContact();
    const { fn: { handleCurrent } } = useChat()

    return (
        <div className='fixed min-h-screen w-[31%] left-0 top-0 bg-bg-secondary'>
            <HeaderContactLayout
                label='Di Arsipkan'
            />

            <div className='w-full flex flex-col pt-6 text-white min-h-[77vh]  justify-between'>

                <div className='flex flex-col overflow-hidden'>

                    <div className={`flex flex-col gap-1 px-2 max-h-[55vh] overflow-y-scroll`}>
                        {
                            contact.sort((a, b) => a.username.localeCompare(b.username)).map(data => {
                                return (
                                    <ContactCard data={data} />
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ArchiveContactConten
