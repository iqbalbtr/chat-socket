import { useMessage } from '@contexts/chat/MessageContext'
import { useChat } from '@contexts/chat/ChatContext';
import LockIcon from "@components/LockIcon";
import { useEffect } from 'react';

function MessageListMenu({ back }: { back: () => void }) {

  const { fn: { removeAllMessage }, router: { current, fn: { handleMessageRouter } } } = useMessage();
  const chat = useChat();

  useEffect(() => {
    if(current.length >= 2){
      back()
    }
  }, [current])

  return (
    <div
      className="w-[240px] bg-hover-color p-6 gap-4 flex flex-col items-start z-10"
    >
      <button onClick={() => handleMessageRouter("user_info")}>
        Info kontak
      </button>
      <button
        onClick={() => removeAllMessage(chat.current.username!, true)}
      >
        Hapus chat
      </button>
      <button>
        Arsipkan
        <LockIcon />
      </button>
      <button onClick={() => removeAllMessage(chat.current.username!, false)}>
        Bersihkan
      </button>
    </div>
  )
}

export default MessageListMenu
