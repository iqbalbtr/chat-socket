import { useContact } from "@contexts/chat/ContactContext"
import Icon from "../../../../../../constants/icons"
import ContactContentLayout from "../ContactContentLayout"
import HeaderContactLayout from "../HeaderContactLayout"
import FieldNewContact from "./FieldNewContact"
import { useRef } from "react"
import { useRouterContact } from "@contexts/chat/contact/RouterContactContext"

function NewContactContent() {

    const { fn: { addContact } } = useContact()
    const { fn: { handleContent } } = useRouterContact()
    const ref = useRef<HTMLFormElement | null>(null);

    async function handleAddContact(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        if(!ref.current) return
        const form = new FormData(ref.current);

        const first_name = form.get("first_name") as string
        const last_name = form.get("last_name") as string
        const username = form.get("username") as string

        if(!first_name || !username) return alert("Kurang lengkap")

        await addContact({
            first_name: first_name,
            last_name: last_name,
            username: username
        }, (err) => {
            if(!err){
                handleContent("idle")
            }
        })
    }

    return (
        <ContactContentLayout>
            <HeaderContactLayout
                label='New Contact'
            />

            <form ref={ref}>
                <div className="flex flex-col gap-2 px-10 py-8 text-white">
                    <div className="flex flex-col items-start gap-2 py-1">
                        <h2 className="text-sm">First name</h2>
                        <FieldNewContact name="first_name" />
                    </div>
                    <div className="flex flex-col items-start gap-2 py-1">
                        <h2 className="text-sm">Last name</h2>
                        <FieldNewContact name="last_name"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 py-1 mt-6">
                        <h2 className="text-sm">Username</h2>
                        <FieldNewContact name="username" />
                    </div>
                </div>

                <div className="py-12 flex justify-center">
                    <button type="submit" onClick={(e) => handleAddContact(e)}>
                        {Icon.check({
                            size: 45,
                            color: "#fff",
                            classname: "p-1 rounded-full bg-green-accent"
                        })}
                    </button>
                </div>
            </form>
        </ContactContentLayout>
    )
}

export default NewContactContent
