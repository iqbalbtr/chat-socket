import React from 'react'
import style from "../../styles/main.module.css"
import { useSession } from '@providers/AuthProvider'
import Modal from '@components/core/Modal';
import ContactAddModal from '../contact/ContactAddModal';
import HeaderProfileModal from '../contact/HeaderProfileModal';
import LockIcon from '@components/LockIcon';
import { colors } from '../../../../../constants/color';


const lock_class = 'flex gap-2 justify-center items-center';

function HeaderMenuList() {

  const { status, logout } = useSession();
  const [tgPrfl, setTglPrfl] = React.useState<boolean>(false);
  const [addTgl, setAddTgl] = React.useState<boolean>(false);

  return (
    <div
      className={`w-[240px] bg-bg-container text-white flex flex-col items-start`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex flex-col gap-4 items-start p-5 pb-3'>
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
        <button className={lock_class}>
          Buat Grup
          <LockIcon />
        </button>
        <button className={lock_class}>
          Setelan
          <LockIcon />
        </button>
        <button onClick={() => logout()} disabled={status === "loading"}>
          {status === "loading" ? "Loading..." : "Keluar"}
        </button>
      </div>
      <a className={`border-[#313f47] border-t-[1px] pt-2 p-5 w-full`} href="">Get WhatsApp for windows</a>
    </div>
  )
}

export default HeaderMenuList
