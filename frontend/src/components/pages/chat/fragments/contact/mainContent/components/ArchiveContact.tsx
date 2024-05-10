import { useRouterContact } from "@contexts/chat/contact/RouterContactContext"
import { colors } from "../../../../../../../constants/color"

function ArchiveContact() {

    const { fn: { handleContent } } = useRouterContact();

    return (
        <div className={`py-4 px-3 flex justify-between border-[${colors.BORDER}] border-b-[1px] mx-6`}>
            <button
                onClick={() => handleContent("archive")}
                className="flex gap-6 text-white w-full"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="archive-alt" width={25}>
                    <path fill={colors.GREEN_ACCENT} d="M10,13h4a1,1,0,0,0,0-2H10a1,1,0,0,0,0,2ZM19,3H5A3,3,0,0,0,4,8.82V18a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8.82A3,3,0,0,0,19,3ZM18,18a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H18ZM19,7H5A1,1,0,0,1,5,5H19a1,1,0,0,1,0,2Z"></path>
                </svg>
                <span style={{ fontSize: 16 }}>Di arsipkan</span>
            </button>
        </div>
    )
}

export default ArchiveContact
