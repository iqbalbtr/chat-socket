import { ReactNode, useState } from "react"

function ModalTransparent({ children, button, disbaleRelative }: { children: (handleTgl: () => void, tgl: boolean) => ReactNode, button: (tgl: boolean) => ReactNode, disbaleRelative?: boolean }) {
    
    const [tgl, setTgl] = useState(false);

    function handleTgl() {
        setTgl(pv => !pv)
    }
    
    return (
        <div className={disbaleRelative ? "absolute w-full" : "relative"}>
            {tgl && <div onClick={handleTgl} className="min-w-full min-h-screen left-0 z-[10] top-0 fixed"></div>}
            <button onClick={handleTgl}>
                {button(tgl)}
            </button>
            {tgl && children(handleTgl, tgl)}
        </div>
    )
}

export default ModalTransparent
