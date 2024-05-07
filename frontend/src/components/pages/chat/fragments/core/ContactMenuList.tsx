import { useMessage } from '@contexts/chat/MessageContext'
import { useChat } from '@contexts/chat/ChatContext';
import LockIcon from "@components/LockIcon";

function ContactMenuList() {

  const { fn: { removeAllMessage } } = useMessage();
  const { current, tgl: { fn: { setTglModal } } } = useChat();

  return (
    <div
      className="w-[240px] bg-hover-color p-6 gap-4 flex flex-col items-start"
    >
      <button onClick={() => setTglModal(pv => ["user_info", "search"].includes(pv) ? "idle" : "user_info")}>
        Info kontak
      </button>
      <button
        onClick={() => removeAllMessage(current.username!, true)}
      >
        Hapus chat
      </button>
      <button>
        Arsipkan
        <LockIcon />
      </button>
      <button onClick={() => removeAllMessage(current.username!, false)}>
        Bersihkan
      </button>
    </div>
  )
}

export default ContactMenuList
