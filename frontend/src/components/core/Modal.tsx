import React from 'react'
import style from "./core.module.css"

function Modal({
    children,
    open,
    setOpen,
    filter = true,
    styles,
    zIndex = 68,
    center = true
}: {
    children: React.ReactNode,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    filter?: boolean,
    styles?: React.CSSProperties,
    zIndex?: number,
    center?: boolean
}) {

    const modalCenter: React.CSSProperties = {
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        open ? (
            <div
                className={style.modal}
                style={{
                    position: center ? "fixed" : "absolute",
                    ...(center && modalCenter),
                    ...styles
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={style.modal_section}
                    onClick={() => setOpen(false)}
                    style={{
                        backgroundColor: filter ? "rgba(0,0,0,.4)" : "",
                        zIndex: 67
                    }}
                ></div>
                <div style={{ zIndex: zIndex }}>
                    {children}
                </div>
            </div>
        ) : null
    )
}

export default Modal
