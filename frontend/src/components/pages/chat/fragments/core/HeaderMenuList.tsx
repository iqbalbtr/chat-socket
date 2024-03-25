import React from 'react'
import style from "../../styles/main.module.css"

function HeaderMenuList() {
  return (
    <div className={style.menu_list}>
      <button>
        Tambah Kontak
      </button>
      <button>
        Lihat Profile
      </button>
      <button>
        Keluar
      </button>
    </div>
  )
}

export default HeaderMenuList
