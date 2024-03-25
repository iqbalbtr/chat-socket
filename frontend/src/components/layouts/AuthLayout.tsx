import React from 'react'
import { Outlet } from 'react-router-dom'
import style from "./styles/auth.module.css";

function AuthLayout() {
  return (
    <div className={style.layout}>
        <Outlet />
    </div>
  )
}

export default AuthLayout
