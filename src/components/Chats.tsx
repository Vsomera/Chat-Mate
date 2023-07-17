import { UserContext } from "../context/userContext"
import { useContext, useState, useEffect } from "react"
import { ChatContext } from "../context/chatContext";
import { db } from "../config/firebase";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { User } from "firebase/auth"
import GroupProfileImg from "./GroupProfileImg"

interface Props {
    // imported states for toggling the search and chats view
    toggleView: boolean
    setToggleView: (arg: boolean) => void
}

const Chats = (props: Props) => {

    const { user } = useContext(UserContext)
    const { selectedChat, setSelectedChat } = useContext(ChatContext)
    const [userChats, setUserChats] = useState<React.ReactNode[]>([]) // holds user chats for the current logged in user

    const changeChat = (chatId: string) => {
        // changes the context chatId
        setSelectedChat(chatId)
    }

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", user?.uid || ""), (doc) => {
            // fetch chats of the current logged in user
            const rawData = Object.entries(doc.data() as Record<string, { 
                chatName: string, lastMessage: string, chatUsers: User[], date: Timestamp 
            }>)

            rawData.sort((a, b) => {
                // sort in descending order (newest to oldest)
                const dateA = a[1].date.seconds
                const dateB = b[1].date.seconds
                return dateB - dateA
            })

            const chatsData =  rawData.map((chat) => { // map through all chats from the current logged in user

                const chatId = chat[0]
                const chatPhoto = chat[1].chatUsers[0].photoURL // TODO : fetch chatPhoto from db
                const chatUsers = chat[1].chatUsers // array of all users in the chat
                const chatName = chat[1].chatName
                const lastMessage = chat[1].lastMessage // last sent message from the chat

                return (
                    <div className={`userChat ${selectedChat === chatId ? "selected-chat" : "deselected-chat"}`} // TODO : Fix why classes are not adding
                        key={chatId} 
                        onClick={() => {chatId !== selectedChat ? changeChat(chatId) : setSelectedChat("")}}>

                        <div className="img-container">
                            {chatUsers.length <= 1
                                // if length of users is less than 1 show the user pfp
                                ? <img
                                    className="chat-img"
                                    src={chatPhoto || ""}
                                    alt="" />
                                // show all user pfp
                                : <GroupProfileImg chatUsers={chatUsers} />
                            }
                        </div>
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
            console.log(selectedChat)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChat]) // listen for changes realtime, and check when a chat is selected

    return (
        <>
            {!props.toggleView &&
                <div className="chats">
                    {userChats.length > 0 ? <p>Messages</p> : <p>you have no messages</p>}
                    {userChats}
                </div>
            }
        </>
    )
}

export default Chats