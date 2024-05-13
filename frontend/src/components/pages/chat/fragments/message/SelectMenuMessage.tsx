import { colors } from "../../../../../constants/color"
import Icon from "../../../../../constants/icons"
import { useRouterMessage } from "@contexts/chat/message/RouterMessageContext";
import { useSelectMessage } from "@contexts/chat/message/SelectMessageContext";

function SelectMenuMessgae() {

    const { fn: { handleModalMessage } } = useRouterMessage();
    const { select, fn: { handleActive } } = useSelectMessage();

    return (
        <div className='relative w-full'>
            <div
                className="flex justify-between items-center bg-bg-primary text-white"
            >

                <div className="w-fit flex gap-3 justify-center items-center p-4 relative">
                    <button
                    onClick={() => handleActive(false)}
                    >
                        {Icon.times({
                            color: colors.ICON_COLOR,
                            size: 30
                        })}
                    </button>
                    <p>{select.data.length} selected</p>
                </div>
                <div className="w-fit flex gap-5 justify-center items-center p-4 relative">
                    <button>
                        {Icon.trash({
                            color: colors.ICON_COLOR,
                            size: 25
                        })}
                    </button>
                    <button onClick={() => handleModalMessage("forward")}>
                        {Icon.corner_right({
                            color: colors.ICON_COLOR,
                            size: 30
                        })}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SelectMenuMessgae
