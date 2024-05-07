import React from 'react'
import { useSession } from '@providers/AuthProvider'
import Modal from '@components/core/Modal';
import ContactAddModal from '../contact/mainContent/components/ContactAddModal';
import LockIcon from '@components/LockIcon';
import { colors } from '../../../../../constants/color';
import { useContact } from '@contexts/chat/ContactContext';


const lock_class = 'flex gap-2 justify-center items-center';

function HeaderMenuList() {

  const { status, logout } = useSession();
  const { tgl: { fn: { setTglContent } } } = useContact();
  const [addTgl, setAddTgl] = React.useState<boolean>(false);
  const { tgl: { fn: { setTglMenu } } } = useContact()

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
          onClick={() => {
            setTglContent("profile")
          }}
        >
          Lihat Profile
        </button>
        <button
          onClick={() => {
            setTglContent("group")
          }}
        >
          Buat Grup
        </button>
        <button
          onClick={() => {
            setTglContent("settings")
          }}
        >
          Setelan
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
