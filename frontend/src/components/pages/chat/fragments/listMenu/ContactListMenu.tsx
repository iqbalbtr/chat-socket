import React, { useEffect } from 'react'
import { useSession } from '@providers/AuthProvider'
import { useContact } from '@contexts/chat/ContactContext';



function ContactMenuList({ handleTgl }: { handleTgl: () => void; }) {

  const { status, logout } = useSession();
  const { tgl: { tglContent, fn: { setTglContent } } } = useContact();


  useEffect(() => {
    if (tglContent.length === 2) {
      handleTgl()
    }
  }, [tglContent])

  return (
    <div
      className={`w-[240px] bg-bg-container text-white flex flex-col items-start absolute top-full right-0 z-50`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex flex-col gap-4 items-start p-5 pb-3'>
        <button
          onClick={() => {
            setTglContent("profile")
          }}
        >
          Lihat Profile
        </button>
        <button
          onClick={() => {
            setTglContent("new_contact")
          }}
        >
          Tambah Kontak
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
      <a className={`border-[#313f47] border-t-[1px] px-5 py-2 w-full`} href="">Get WhatsApp for windows</a>
    </div>
  )
}

export default ContactMenuList
