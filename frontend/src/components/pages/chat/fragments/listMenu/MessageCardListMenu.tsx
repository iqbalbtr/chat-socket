import React from 'react'
// import MessageForwadsModal from '../message/mainContent/components/MessageForwadsModal';
import { useMessage } from '@contexts/chat/MessageContext';
import { MsgType } from '@contexts/chat/ChatContext';
import { usePullMessage } from '@contexts/chat/message/PullMessage.Context';
import { useSelectMessage } from '@contexts/chat/message/SelectMessageContext';

function MessageCardListMenu({ msg, setTgl }: { msg: MsgType, setTgl: React.Dispatch<React.SetStateAction<boolean>> }) {

  const { fn: { handlePull } } = usePullMessage()
  const { fn: { removeMessage } } = useMessage()
  const { fn: { handleSelect } } = useSelectMessage()

  return (
    <div
      className="w-[140px] bg-[#233138] p-3 gap-3 flex flex-col items-start relative z-10"
    >
      <button
        onClick={() => {
          handleSelect(msg)
          setTgl(pv => !pv)
        }}
      >
        Teruskan
      </button>

      <button onClick={() => {
        handlePull(msg)
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

