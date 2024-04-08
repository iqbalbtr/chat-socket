import { useSession } from '@providers/AuthProvider'
import style from "../../styles/contact.module.css"
import React from 'react';

function HeaderProfileModal({
  onClose
}:{
  onClose: React.Dispatch<React.SetStateAction<boolean>> 
}) {

  const { user: { username } } = useSession();

  return (
    <div
      style={{
        width: "440px",
        position: "fixed",
        height: "100%",
        background: "var(--primary-color)",
        top: 0,
        left: 0
      }}
    >
      <div className={style.contact_modal_container}>
        <div className={style.contact_modal_header}>
          <button
            style={{
              cursor: "pointer"
            }}
            onClick={() => onClose(pv => !pv)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24" id="times">
              <path fill="#000"
                d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
            </svg>
          </button>

          <h3>Info kontak</h3>
        </div>
        <div className={style.contact_modal_profile}>
          <span>{username?.charAt(0).toUpperCase()}</span>
          <p>@{username}</p>
          <input type="text" value={username} disabled />
        </div>
        <div className={style.contact_modal_action_container}>
          <h3 style={{ padding: 8 }}>Tentang</h3>
          <div className={style.contact_modal_action}>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus beatae nisi minima.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderProfileModal
