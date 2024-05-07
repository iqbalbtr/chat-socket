import { useContact } from "@contexts/chat/ContactContext"
import { colors } from "../../../../../../../constants/color";

function SearchContact() {
  const { fn: { seacrhContact, toggleByRead }, seacrh: { byRead } } = useContact();
  return (
    <div className={`flex gap-2 px-4 py-2 justify-center items-center`}>
      <input type="text" onChange={(e) => seacrhContact(e.target.value)} 
      className="w-full bg-bg-primary rounded-md py-1 px-2" 
      placeholder="Nama atau Username" />
      <button
        onClick={toggleByRead}
        className={byRead ? "bg-green-accent p-1 rounded-full" : "p-1"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="align-center"
          width={17}
          height={17}
        >
          <path
            fill={byRead ? "#fff" : colors.ICON_COLOR}
            d="M3,7H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,7ZM7,9a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm14,4H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Z"
          >
          </path>
        </svg>
      </button>
    </div>
  )
}

export default SearchContact
