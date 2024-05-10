import { useEffect } from 'react'
import { useSession } from '@providers/AuthProvider'
import { useRouterContact } from '@contexts/chat/contact/RouterContactContext';



function ContactMenuList({ handleTgl }: { handleTgl: () => void; }) {

  const { status, logout } = useSession();
  const { content, fn: { handleContent } } = useRouterContact();

  useEffect(() => {
    if (content.length === 2) {
      handleTgl()
    }
  }, [content])

  return (
    <div
      className={`w-[240px] bg-bg-container text-white flex flex-col items-start absolute top-full right-0 z-50`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex flex-col gap-4 items-start p-5 pb-3'>
        <button
          onClick={() => {
            handleContent("profile")
          }}
        >
          Lihat Profile
        </button>
        <button
          onClick={() => {
            handleContent("new_contact")
          }}
        >
          Tambah Kontak
        </button>

        <button
          onClick={() => {
            handleContent("group")
          }}
        >
          Buat Grup
        </button>
        <button
          onClick={() => {
            handleContent("settings")
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
