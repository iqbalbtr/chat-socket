import { useMessage } from '@contexts/chat/MessageContext';
import { useSession } from '@providers/AuthProvider';

function MessagePullCard() {

    const { user: { username } } = useSession();
    const { pull, fn: { removePull } } = useMessage();

    return (
        <div style={{
            display: "flex",
            padding: "12px",
            alignItems: "center",
            background: "var(--secondary-color)"
        }}>
            <div
                style={{
                    width: "100%",
                    borderLeft: "3px solid var(--primary-color)",
                    padding: "0 14px",
                    maxHeight: 35,
                    overflowY: "scroll"
                }}
            >
                <h5>{pull?.info.from=== username ? "You" : pull?.info.to}</h5>
                <p style={{fontSize: 14, marginTop: 2}}>{pull?.msg}</p>
        </div>
            <button 
            style={{
                marginRight: "22px",
                cursor: "pointer"
            }}
            onClick={() => removePull()}>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 24 24" id="times">
                    <path fill="#000"
                        d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                </svg>
            </button>
        </div>
    )
}

export default MessagePullCard
