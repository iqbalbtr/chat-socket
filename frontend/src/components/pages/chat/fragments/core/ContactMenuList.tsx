import React from 'react'
import style from "../../styles/chat.module.css"

function ContactMenuList() {
  return (
    <div
      className={style.container_list_menu}
      style={{
        width: "120px"
      }}
    >
      <button>
        Bagikan
      </button>
      <button>
        Hapus chat
      </button>
    </div>
  )
}

export default ContactMenuList
