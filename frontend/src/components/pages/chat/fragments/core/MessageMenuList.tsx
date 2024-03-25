import React from 'react'
import style from "../../styles/chat.module.css"

function MessageMenuList() {
  return (
    <div
      className={style.container_list_menu}
    >
      <button>
        Teruskan
      </button>
      <button>
        Hapus
      </button>
      <button>Tarik</button>
    </div>
  )
}

export default MessageMenuList
