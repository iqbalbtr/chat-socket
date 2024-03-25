import React from 'react'
import { Link } from 'react-router-dom'
import style from "./home.module.css"

function Landing() {
  return (
    <div className={style.layout}>
      <h1>Chit chat Commoners</h1>
      <div className={style.container_brand}>
        <Link to={"/auth/login"}>Masuk</Link>
        <p>Belum punya akun? <Link to={"/auth/register"}>Register</Link></p>
      </div>
    </div>
  )
}

export default Landing
