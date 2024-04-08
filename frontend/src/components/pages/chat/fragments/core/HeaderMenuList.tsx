import React from 'react'
import style from "../../styles/main.module.css"
import { useSession } from '@providers/AuthProvider'
import Modal from '@components/core/Modal';
import ContactAddModal from '../contact/ContactAddModal';
import HeaderProfileModal from '../contact/HeaderProfileModal';

function HeaderMenuList() {

  const { logout } = useSession();
  const [tgPrfl, setTglPrfl] = React.useState<boolean>(false);
  const [addTgl, setAddTgl] = React.useState<boolean>(false);

  return (
    <div
      className={style.menu_list}
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={() => setAddTgl(pv => !pv)}>
        Tambah Kontak
      </button>
      <Modal
        open={addTgl}
        setOpen={setAddTgl}
        styles={{
          zIndex: 69,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ContactAddModal />
      </Modal>
      <button
        onClick={() => setTglPrfl(pv => !pv)}
      >
        Lihat Profile
      </button>
      {tgPrfl && <HeaderProfileModal onClose={setTglPrfl} />}
      <button>
        Buat Grup
      </button>
      <button onClick={() => logout()}>
        Keluar
      </button>
    </div>
  )
}

export default HeaderMenuList
