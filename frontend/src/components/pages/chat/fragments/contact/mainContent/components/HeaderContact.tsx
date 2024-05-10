import { useSession } from '@providers/AuthProvider';
import Profile from '../../../cards/Profile';
import ContactMenuList from '../../../listMenu/ContactListMenu';
import Icon from '../../../../../../../constants/icons';
import { colors } from '../../../../../../../constants/color';
import ModalTransparent from '@components/core/ModalTransparent';
import { useRouterContact } from '@contexts/chat/contact/RouterContactContext';

function HeaderContact() {

    const { user } = useSession();
    const { fn: { handleContent, handleToggle } } = useRouterContact();

    return (
        <div className={`w-full flex justify-between py-2 px-4 bg-bg-primary relative`}>
            <button onClick={() => handleContent("profile")}>
                <Profile username={user.username || ""} width={40} />
            </button>
            <div
                className='relative flex gap-5 items-center'
            >
                <button
                    onClick={() => handleContent("status")}
                >
                    {Icon.circle({
                        size: 25,
                        color: colors.ICON_COLOR
                    })}
                </button>
                <button onClick={() => handleContent("new_message")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={25} viewBox="0 0 24 24" id="comment-alt-plus">
                        <path fill="#aebbc2"
                            d="M15,9H13V7a1,1,0,0,0-2,0V9H9a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V11h2a1,1,0,0,0,0-2Zm4-7H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"></path>
                    </svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="comments-alt" width={25}>
                        <path fill="#aebbc2"
                            d="M19,8H18V5a3,3,0,0,0-3-3H5A3,3,0,0,0,2,5V17a1,1,0,0,0,.62.92A.84.84,0,0,0,3,18a1,1,0,0,0,.71-.29l2.81-2.82H8v1.44a3,3,0,0,0,3,3h6.92l2.37,2.38A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V11A3,3,0,0,0,19,8ZM8,11v1.89H6.11a1,1,0,0,0-.71.29L4,14.59V5A1,1,0,0,1,5,4H15a1,1,0,0,1,1,1V8H11A3,3,0,0,0,8,11Zm12,7.59-1-1a1,1,0,0,0-.71-.3H11a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1Z"></path>
                    </svg>
                </button>
                <ModalTransparent
                    button={() => (
                        <div
                            style={{ position: "relative", cursor: "pointer" }}
                            onClick={() => handleToggle()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={25} viewBox="0 0 24 24" id="ellipsis-v">
                                <path fill="#aebbc2"
                                    d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"></path>
                            </svg>
                        </div>
                    )}
                >
                    {(handleTgl, tgl) => (
                        <ContactMenuList handleTgl={handleTgl} />
                    )}
                </ModalTransparent>
            </div>
        </div>
    )
}

export default HeaderContact
