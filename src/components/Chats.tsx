import { UserContext } from "../context/userContext"
import { useContext, useState, useEffect } from "react"
import { db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { User } from "firebase/auth"

interface Props {
    toggleView: boolean
    setToggleView: (arg: boolean) => void
}

const Chats = (props: Props) => {

    const { user } = useContext(UserContext)
    const [userChats, setUserChats] = useState<React.ReactNode[]>([]) // holds user chats for the current logged in user

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", user?.uid || ""), (doc) => {
            // fetch chats of the current logged in user
            const rawData = Object.entries(doc.data() as Record<string, { lastMessage: string, chatUsers: User[], date: Date }>)
            const chatsData = rawData.map((chat) => { // map through all chats from the current logged in user

                const chatId = chat[0]
                const chatPhoto = chat[1].chatUsers[0].photoURL
                const chatUsers = chat[1].chatUsers // array of all users in the chat
                const chatName = chatUsers.length < 2? chatUsers[0].displayName : "New Group Chat"
                const lastMessage = chat[1].lastMessage // last sent message from the chat

                return (
                    <div className="userChat" key={chatId}>
                        <img
                            className="chat-img"
                            src={chatPhoto || ""}
                            alt="" />
                        <div className="chat-info">
                            <p>{chatName}</p>
                            <p>{lastMessage}</p>
                        </div>
                    </div>
                )

            })
            setUserChats(chatsData)
        })

        return () => {
            unSub()
        }

    }, [user])

    return (
        <>
            {!props.toggleView &&
                <div className="chats">
                    {userChats}
                </div>
            }
        </>
    )
}

export default Chats