import { useMessage } from '@contexts/chat/MessageContext'
import { useChat } from '@contexts/chat/ChatContext';
import LockIcon from "@components/LockIcon";
import { useEffect } from 'react';
import { useRouterMessage } from '@contexts/chat/message/RouterMessageContext';

function MessageListMenu({ back }: { back: () => void }) {

  const { fn: { removeAllMessage }} = useMessage();
  const { fn: { handleRouterMessage }} = useRouterMessage();
  const chat = useChat();

  function hanldeButton(fn: () => void){
    fn()
    back()
  }

  return (
    <div
      className="w-[240px] absolute right-0 bg-hover-color p-6 gap-4 flex flex-col items-start z-10"
    >
      <button onClick={() => hanldeButton(() => handleRouterMessage("user_info"))}>
        Info kontak
      </button>
      <button
        onClick={() => hanldeButton(() => removeAllMessage(chat.current.username!, true))}
      >
        Hapus chat
      </button>
      <button>
        Arsipkan
        <LockIcon />
      </button>
      <button onClick={() => hanldeButton(() => removeAllMessage(chat.current.username!, false))}>
        Bersihkan
      </button>
    </div>
  )
}

export default MessageListMenu
