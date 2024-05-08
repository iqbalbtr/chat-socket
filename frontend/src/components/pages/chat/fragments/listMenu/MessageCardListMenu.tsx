import React from 'react'
// import MessageForwadsModal from '../message/mainContent/components/MessageForwadsModal';
import { useMessage } from '@contexts/chat/MessageContext';
import { MsgType } from '@contexts/chat/ChatContext';

function MessageCardListMenu({ msg, setTgl }: { msg: MsgType, setTgl: React.Dispatch<React.SetStateAction<boolean>> }) {

  const { fn: { pullMessage, removeMessage, handleForward } } = useMessage()

  return (
    <div
      className="w-[140px] bg-[#233138] p-3 gap-3 flex flex-col items-start relative z-10"
    >
      <button
        onClick={() => {
          handleForward(msg)
          setTgl(pv => !pv)
        }}
      >
        Teruskan
      </button>

      <button onClick={() => {
        pullMessage(msg.id)
        setTgl(pv => !pv)
      }}>
        Balas
      </button>

      <button
        onClick={() => {
          removeMessage(msg.id, msg.info.to!, (err) => {
            if (!err) {
              setTgl(pv => !pv)
            }
          })
          setTgl(pv => !pv)
        }}>
        Hapus
      </button>
    </div>
  )
}

export default MessageCardListMenu

