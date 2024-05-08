import Icon from "../../../../../../constants/icons"
import HeaderContactLayout from "../HeaderContactLayout"
import FieldNewContact from "./FieldNewContact"

function NewContactContent() {
    return (
        <div className='fixed min-h-screen w-[31%] left-0 top-0 bg-bg-secondary flex justify-between flex-col'>
            <HeaderContactLayout
                label='New Contact'
            />

            <div className="flex flex-col gap-2 px-10 py-8 text-white">
                <div className="flex flex-col items-start gap-2 py-1">
                    <h2 className="text-sm">First name</h2>
                    <FieldNewContact />
                </div>
                <div className="flex flex-col items-start gap-2 py-1">
                    <h2 className="text-sm">Last name</h2>
                    <FieldNewContact />
                </div>
                <div className="flex flex-col items-start gap-2 py-1 mt-6">
                    <h2 className="text-sm">Username</h2>
                    <FieldNewContact />
                </div>
            </div>

            <div className="py-12 flex justify-center">
                <button>
                    {Icon.check({
                        size: 45,
                        color: "#fff",
                        classname: "p-1 rounded-full bg-green-accent"
                    })}
                </button>
            </div>
        </div>
    )
}

export default NewContactContent
