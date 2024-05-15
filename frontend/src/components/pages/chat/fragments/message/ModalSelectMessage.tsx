import { useContact } from "@contexts/chat/ContactContext"
import { colors } from "../../../../../constants/color"
import Icon from "../../../../../constants/icons"
import Cheked from "../cards/Cheked";
import ContactCard from "../cards/ContactCard";

function ModalSelectMessage({ handleTgl }: { handleTgl: () => void }) {

    const { contact } = useContact();

    return (
        <div
            className="w-[450px] p-6 bg-bg-secondary absolute top-1/2 left-1/2 -translate-y-1/2"
        >
            <div className="p-6 flex gap-6 items-center bg-bg-primary">
                <button
                    onClick={handleTgl}
                >
                    {
                        Icon.times({
                            size: 25,
                            color: colors.ICON_COLOR
                        })
                    }
                </button>
                <button>
                    Forward message to
                </button>
            </div>
            <div
                className="flex flex-col gap-3"
            >
                <div>
                    <button>
                        {Icon.arrow_left({
                            size: 25,
                            color: colors.GREEN_ACCENT
                        })}
                    </button>
                    <input type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    {
                        contact.map(con => (
                            <button>
                                <Cheked value={false} />
                                <ContactCard data={con} />
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalSelectMessage
