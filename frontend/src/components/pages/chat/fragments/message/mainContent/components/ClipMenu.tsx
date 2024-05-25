import { useSendFile } from "@contexts/chat/message/SendFileContext"

function ClipMenu() {

  const { fn: { handleAddFile } } = useSendFile()

  return (
    <div
      className="absolute w-[180px] z-50 left-0 bottom-[150%] rounded-lg flex flex-col gap-3 bg-hover-color p-3 items-start text-white"
    >
      <button
        className="relative"
      >
        Photo & video
        <input
          className="absolute z-30 top-0 left-0 right-0 bottom-0 opacity-0"
          onChange={(e) => e.target.files && handleAddFile(e.target.files[0]!, "", true)}
          type="file"
        />
      </button>
      <button
        className="relative"
      >
        Documents
        <input
          className="absolute z-30 top-0 left-0 right-0 bottom-0 opacity-0"
          onChange={(e) => e.target.files && handleAddFile(e.target.files[0]!, "", false)}
          type="file"
        />
      </button>
    </div>
  )
}

export default ClipMenu
