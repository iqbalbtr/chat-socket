import style from "../../styles/main.module.css"
import Modal from '@components/core/Modal'
import HeaderMenuList from '../core/HeaderMenuList';
import { useSession } from '@providers/AuthProvider';
import { useChat } from '@contexts/chat/ChatContext';
import Profile from '../cards/Profile';

function HeaderContact() {

    const { user } = useSession();
    const { tgl: { tglHead, fn: { setTglHead } } } = useChat();
    return (
        <div className={style.header}>
            <div>
                <Profile username={user.username || ""} width={40} />
            </div>
            <div style={{position: "relative"}}>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width={25} viewBox="0 0 24 24" id="comment-alt-plus">
                        <path fill="#000"
                            d="M15,9H13V7a1,1,0,0,0-2,0V9H9a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V11h2a1,1,0,0,0,0-2Zm4-7H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"></path>
                    </svg>
                </button>
                <button
                    style={{ position: "relative", cursor: "pointer" }}
                    onClick={() => setTglHead(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={25} viewBox="0 0 24 24" id="ellipsis-v">
                        <path fill="#000"
                            d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"></path>
                    </svg>
                </button>
                <Modal
                        open={tglHead}
                        setOpen={setTglHead}
                        filter={false}
                        center={false}
                        styles={{
                            right: "100px",
                            bottom: 0
                        }}
                    >
                        <HeaderMenuList />
                    </Modal>
            </div>
        </div>
    )
}

export default HeaderContact
