import React from 'react'
import style from "../styles/chat.module.css"

function SendMessage() {
    const [tglClip, setTglClip] = React.useState<boolean>(false)
    return (
        <div >
            <div
                className={style.send_message}
                style={{
                    bottom: tglClip ? "0px" : "-140px"
                }}
            >
                <button
                    onClick={() => setTglClip(pv => !pv)}
                >
                    {
                        tglClip ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 24 24" id="times">
                                <path fill="#000"
                                    d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 24 24" id="paperclip">
                                <path fill="#00"
                                    d="M18.08,12.42,11.9,18.61a4.25,4.25,0,0,1-6-6l8-8a2.57,2.57,0,0,1,3.54,0,2.52,2.52,0,0,1,0,3.54l-6.9,6.89A.75.75,0,1,1,9.42,14l5.13-5.12a1,1,0,0,0-1.42-1.42L8,12.6a2.74,2.74,0,0,0,0,3.89,2.82,2.82,0,0,0,3.89,0l6.89-6.9a4.5,4.5,0,0,0-6.36-6.36l-8,8A6.25,6.25,0,0,0,13.31,20l6.19-6.18a1,1,0,1,0-1.42-1.42Z"></path>
                            </svg>
                        )
                    }
                </button>
                <input type="text" className={style.field} />
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 24 24" id="message">
                        <path fill="#000"
                            d="M20.34,9.32l-14-7a3,3,0,0,0-4.08,3.9l2.4,5.37h0a1.06,1.06,0,0,1,0,.82l-2.4,5.37A3,3,0,0,0,5,22a3.14,3.14,0,0,0,1.35-.32l14-7a3,3,0,0,0,0-5.36Zm-.89,3.57-14,7a1,1,0,0,1-1.35-1.3l2.39-5.37A2,2,0,0,0,6.57,13h6.89a1,1,0,0,0,0-2H6.57a2,2,0,0,0-.08-.22L4.1,5.41a1,1,0,0,1,1.35-1.3l14,7a1,1,0,0,1,0,1.78Z"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default SendMessage
