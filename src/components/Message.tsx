import { useContext } from "react"
import { Timestamp } from "firebase/firestore"
import { UserContext } from "../context/userContext"
import { ChatContext } from "../context/chatContext"

interface Props {
    message: {
        id: string,
        date: Timestamp,
        senderId: string,
        text: string
    }
}

const Message = (props: Props) => {

    const { id, date, senderId, text } = props.message
    const { user } = useContext(UserContext)
    const { selectedChat, isLoading, chatUsers } = useContext(ChatContext)

    // convert date into human readable format
    const formattedDate = date && date.toDate().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return (
        <>
            {selectedChat && !isLoading &&
                <div className={`message ${senderId === user?.uid && "me"}`} key={id}>

                    {user?.uid !== senderId &&
                        <img
                            className="msg-pfp"
                            src={chatUsers.filter((chatUser) => chatUser.uid === senderId 
                                && chatUser.photoURL)[0]?.photoURL || ""}
                            referrerPolicy="no-referrer"
                            alt="" />
                    }
                    
                    <div className={`msg-content ${user?.uid == senderId && "me"}`}>
                        <div className="msg-text">
                            <p>{text}</p>
                        </div>
                        <p>{formattedDate}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default Message