import React from 'react'
import style from "./styles/main.module.css"
import Modal from '@components/core/Modal'
import HeaderMenuList from './fragments/core/HeaderMenuList';

function Header() {

    const [toggle, setToggle] = React.useState<boolean>(false);

    return (
        <div className={style.header}>
            <h1>Chat</h1>
            <div>
                <span>@user</span>
                <div
                    style={{ position: "relative", cursor: "pointer"}}
                    onClick={() => setToggle(pv => !pv)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={25} viewBox="0 0 24 24" id="ellipsis-v">
                        <path fill="#000"
                            d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"></path>
                    </svg>
                    <Modal open={toggle} setOpen={setToggle} filter={false}>
                        <HeaderMenuList />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Header
