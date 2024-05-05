import React from 'react'
import style from "../../styles/chat.module.css"
import Modal from '@components/core/Modal';
import MessageForwadsModal from '../message/MessageForwadsModal';
import { useMessage } from '@contexts/chat/MessageContext';
import { MsgType } from '@contexts/chat/ChatContext';

function MessageMenuList({ msg, setTgl }: { msg: MsgType, setTgl: React.Dispatch<React.SetStateAction<boolean>> }) {

  const { fn: { pullMessage, removeMessage, handleForward } } = useMessage()
  const [tglFwd, setTglFwd] = React.useState(false);

  return (
    <div
      className="w-[240px] bg-hover-color p-6"
    >
      <button onClick={() => {
        handleForward(msg)
        setTglFwd(true);
      }}>
        Teruskan
      </button>
      <Modal open={tglFwd} setOpen={setTglFwd} filter={false}>
        <MessageForwadsModal />
      </Modal>
      <button onClick={() => pullMessage(msg.id)}>Balas</button>
      <button onClick={() => removeMessage(msg.id, msg.info.to!, (err) => {
        if (!err) {
          setTgl(pv => !pv)
        }
      })}>
        Hapus
      </button>
    </div>
  )
}

export default MessageMenuList
