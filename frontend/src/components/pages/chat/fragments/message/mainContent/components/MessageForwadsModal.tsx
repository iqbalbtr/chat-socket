import React from "react";
import ContactCard from "../../../cards/ContactCard";
import { useContact } from "@contexts/chat/ContactContext";
import { useSelectMessage } from "@contexts/chat/message/SelectMessageContext";
import ContactGrupCard from "../../../contact/NewGrupContent/components/ContactGrupCard";
import Cheked from "../../../cards/Cheked";
import { useMessage } from "@contexts/chat/MessageContext";

function MessageForwadsModal() {

  const [list, setList] = React.useState<string[]>([]);
  const { contact } = useContact();
  const {fn:{sendMessage}} = useMessage()
  const { select } = useSelectMessage();

  function handleCkebox(e: string) {
    const find = list.find(li => li === e)
    if (find) {
      return setList(pv => pv.filter(fil => fil !== find))
    } else {
      return setList(pv => [...pv, e])
    }

  }

  function handleSend() {
    if (!select.data.length) return
    for (const user of list) {
      const type = contact.find(foo => foo.username === user)?.type;
      for(const msg of select.data){        
        sendMessage({
          input: msg.msg,
          to: user,
          type: type!,
          fwd: true
        }, (status) => status);
      }
    }
  }

  return (
    <div style={{
      padding: 12,
      background: "var(--primary-color)",
      width: "450px",
      borderRadius: 12,
    }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4 max-h-[400px] overflow-y-scroll overflow-x-hidden">
        {
          contact.map(cons => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "5% 90%",
                gap: "45px "
              }}
              className="text-white"
              key={cons.id}
            >
              <Cheked value={list.find(foo => foo === cons.username) ? true : false} action={() => handleCkebox(cons.username)} />
              {/* <input value={cons.username}  type="checkbox" onChange={ /> */}
              <ContactGrupCard data={cons} />
            </div>
          ))
        }

      </div>
      <div className="flex justify-between px-4 text-white">
        <p className="line-clamp-1 max-w-48">
          {list.map(li => ( contact.find(foo => foo.username === li)?.name.split("%2f").join(" ") || li) + ", ")}
          </p>
        <button onClick={handleSend}>Kirim</button>
      </div>
    </div>
  )
}

export default MessageForwadsModal
