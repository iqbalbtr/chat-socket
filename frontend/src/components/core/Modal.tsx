import React from 'react'
import style from "./core.module.css"

function Modal({
    children,
    open,
    setOpen,
    filter = true,
    styles
}: {
    children: React.ReactNode,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    filter?: boolean,
    styles?: React.CSSProperties
}) {

    return (
        open ? (
            <>
                <div
                    className={style.modal}
                >
                    <div
                        className={style.modal_section}
                        style={{
                            backgroundColor: filter ? "rgba(0,0,0,.4)" : ""
                        }}
                    ></div>
                </div>
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: "absolute",
                        zIndex: 68,
                        ...styles
                    }}
                    >
                    {children}
                </div>
            </>
        ) : null
    )
}

export default Modal
