import { ReactNode, useState } from "react"

function ModalTransparent({ children, button }: { children: (handleTgl: () => void, tgl: boolean) => ReactNode, button: (tgl: boolean) => ReactNode }) {
    
    const [tgl, setTgl] = useState(false);

    function handleTgl() {
        setTgl(pv => !pv)
    }
    
    return (
        <div className="relative">
            {tgl && <div onClick={handleTgl} className="min-w-full min-h-screen left-0 top-0 fixed"></div>}
            <button onClick={handleTgl}>
                {button(tgl)}
            </button>
            {tgl && children(handleTgl, tgl)}
        </div>
    )
}

export default ModalTransparent
