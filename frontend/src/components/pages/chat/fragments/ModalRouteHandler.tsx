import { ModalRouterMessageType } from "@contexts/chat/MessageContext"
import { ReactNode } from "react"
import Icon from "../../../../constants/icons";
import { colors } from "../../../../constants/color";
import { useRouterMessage } from "@contexts/chat/message/RouterMessageContext";


type DataSwitch = {
    name: ModalRouterMessageType,
    label: string;
    children: ReactNode
}

function ModalRouteHandler<T>({ child, name }: { name: T[], child: DataSwitch[] }) {

    const { modal, fn: { handleModalMessage } } = useRouterMessage();

    const exist = child.find(con => con.name === name[name.length - 1]);

    return modal.length >= 2 && (
        <div
            className="fixed min-h-screen top-0 left-0 w-full flex z-10 justify-center items-center bg-black/50"
        >
            <button
                className="fixed min-h-screen top-0 left-0 w-full flex z-10 justify-center items-center bg-black/50"
                onClick={() => handleModalMessage("back")}
            ></button>
            <div
                className="w-[450px] bg-bg-secondary relative z-30"
            >
                {
                    exist && (
                        <>
                            <div className="p-4 bg-bg-primary text-white flex items-center gap-3">
                                <button
                                    onClick={() => handleModalMessage("back")}
                                >
                                    {Icon.times({
                                        size: 25,
                                        color: colors.ICON_COLOR
                                    })}
                                </button>
                                <h3 className="text-2xl">{exist.label}</h3>
                            </div>
                            {exist.children}
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ModalRouteHandler
