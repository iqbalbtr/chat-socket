import style from "../../styles/contact.module.css";
import { ContactType, useChat } from '@contexts/chat/ChatContext';
function ContactCard({
    data
}: {
    data: ContactType
}) {

    const { fn: { handleCurrent } } = useChat();

    return (

        <div
            onClick={() => handleCurrent(data, "private")}
            className={style.contact_card}
        >
            <div
            style={{
                position: "relative",
                width: "100%"
            }}
            >
                <span>{data.name.charAt(0).toUpperCase()}</span>
                <div>
                    <h3>{data.name}</h3>
                    <div>
                        <p style={{ fontSize: 14, maxHeight: 20, maxWidth: 280, overflow: "hidden" }}>{data.lastMsg?.msg}</p>
                    </div>
                </div>
                {data.lastMsg && !data.lastMsg?.read && <span style={{ 
                    background: "var(--primary-color)", 
                    width: "10px", 
                    aspectRatio: "1/1", 
                    position: "absolute",
                    right: 0
                    }}></span>}
            </div>
        </div>
    )
}

export default ContactCard
