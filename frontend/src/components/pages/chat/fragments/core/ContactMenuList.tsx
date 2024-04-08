import style from "../../styles/chat.module.css"
import { useMessage } from '@contexts/chat/MessageContext'
import { useChat } from '@contexts/chat/ChatContext';

function ContactMenuList() {

  const { fn: { removeAllMessage } } = useMessage();
  const { current, tgl: { fn: { setTglModal } } } = useChat();

  return (
    <div
      className={style.container_list_menu}
      style={{
        width: "120px"
      }}
    >
      <button onClick={() => setTglModal(pv => !pv)}>
        Info kontak
      </button>
      <button
        onClick={() => removeAllMessage(current.username!, true)}
      >
        Hapus chat
      </button>
      <button>
        Arsipkan
      </button>
      <button onClick={() => removeAllMessage(current.username!, false)}>
        Bersihkan
      </button>
    </div>
  )
}

export default ContactMenuList
