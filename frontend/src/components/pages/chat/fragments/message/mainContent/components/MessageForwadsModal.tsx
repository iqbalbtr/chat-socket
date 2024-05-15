import React from "react";
import ContactCard from "../../../cards/ContactCard";
import { useContact } from "@contexts/chat/ContactContext";
import { useSelectMessage } from "@contexts/chat/message/SelectMessageContext";

function MessageForwadsModal() {

  const [list, setList] = React.useState<string[]>([]);
  const { contact } = useContact();
  const { select } = useSelectMessage();

  function handleCkebox(e: React.ChangeEvent<HTMLInputElement>) {
    const find = list.find(li => li === e.target.value)
    if (find) {
      return setList(pv => pv.filter(fil => fil !== find))
    } else {
      return setList(pv => [...pv, e.target.value])
    }

  }

  function handleSend() {
    if (!select) return
    for (const fwd of list) {
      // sendMessage({
      //   input: forward.msg,
      //   to: fwd,
      //   type: "private",
      //   fwd: forward.info.from
      // }, (status) => status);
    }
  }

  return (
    <div style={{
      padding: 12,
      background: "var(--primary-color)",
      width: "450px",
      borderRadius: 12
    }}>
      {
        contact.map(cons => (
          <div style={{
            display: "grid",
            gridTemplateColumns: "90% 5%"
          }}
          key={cons.id}
          >
            <ContactCard data={cons} />
            <input value={cons.username} type="checkbox" onChange={(e) => handleCkebox(e)} />
          </div>
        ))
      }
      <button onClick={handleSend}>Kirim</button>
    </div>
  )
}

export default MessageForwadsModal
