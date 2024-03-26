import React from 'react'
import style from "../../styles/main.module.css"
import { useSession } from '@providers/AuthProvider'

function HeaderMenuList() {  
  const { logout } = useSession();
  return (
    <div 
    className={style.menu_list}
    >
      <button>
        Tambah Kontak
      </button>
      <button>
        Lihat Profile
      </button>
      <button onClick={() => logout()}>
        Keluar
      </button>
    </div>
  )
}

export default HeaderMenuList
