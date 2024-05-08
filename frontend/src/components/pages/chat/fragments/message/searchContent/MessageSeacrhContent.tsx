import { colors } from "../../../../../../constants/color"
import Icon from "../../../../../../constants/icons";
import { useState } from "react";
import { useMessage } from "@contexts/chat/MessageContext";

function MessageSearchContent() {

    const [seacrh, setSearch] = useState({
        text: "",
        status: false
    });
    const {router:{ fn:{handleMessageRouter}}} = useMessage()

    return (
        <div
            style={{
                // maxHeight: "100vh",
                width: "640px",
                overflow: "hidden"
            }}
        >
            <div className='text-white bg-bg-secondary mb-16 h-fit'>
                <div className={`bg-bg-primary flex gap-2 px-3 items-center py-3.5`}>
                    <button
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={() => handleMessageRouter("back")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24" id="times">
                            <path fill={colors.ICON_COLOR}
                                d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                        </svg>
                    </button>

                    <h3>Search Message</h3>
                </div>
                <div className='w-full h-[95vh] overflow-scroll bg-bg-secondary'>
                    <div>
                        <div className="p-4 relative">
                            {
                                seacrh.text || seacrh.status ?
                                    <button onClick={() => setSearch({ text: "", status: false })}>
                                        {
                                            Icon.arrow_left({
                                                size: 25,
                                                color: colors.GREEN_ACCENT,
                                                classname: "absolute left-5 top-1/2 -translate-y-1/2"
                                            })
                                        }
                                    </button> :
                                    <button>
                                        {
                                            Icon.search({
                                                color: colors.ICON_COLOR,
                                                size: 20,
                                                classname: "absolute left-5 top-1/2 -translate-y-1/2"
                                            })
                                        }
                                    </button>
                            }
                            <input
                                onChange={(e) => setSearch(pv => ({ ...pv, text: e.target.value }))}
                                onFocus={() => setSearch(pv => ({ ...pv, status: true }))}
                                onBlur={() => setSearch(pv => ({ ...pv, status: false }))}
                                type="text"
                                value={seacrh.text}
                                className="py-1 px-2 pl-8 rounded-md bg-hover-color w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageSearchContent
