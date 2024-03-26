import React from 'react'
import { Link } from 'react-router-dom'
import style from "./home.module.css"
import { useSession } from '@providers/AuthProvider'

function Landing() {
  const { status } = useSession();
  return (
    <div className={style.layout}>
      <h1>Chit chat Commoners</h1>
      <div className={style.container_brand}>
        <Link to={status === "Authorized" ? "/chat" : "/auth/login"}>Masuk</Link>
      </div>
    </div>
  )
}

export default Landing
