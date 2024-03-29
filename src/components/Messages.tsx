import { useContext, useEffect, useState, useRef } from "react"
import { db } from "../config/firebase"
import { Timestamp, doc, onSnapshot } from "firebase/firestore"
import { ChatContext } from "../context/chatContext"
import Message from "./Message"
import { toast } from "react-toastify"

const Messages = () => {

    const { selectedChat } = useContext(ChatContext)
    const [messages, setMessages] = useState<React.ReactNode[]>([]) // holds the selected chat message

    const messagesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        try {
            if (selectedChat) {
                const unSub = onSnapshot(doc(db, "chats", selectedChat), (doc) => {
                    const rawData = Object.entries(doc.data() as Record<string, [{
                        id: string,
                        date: Timestamp,
                        senderId: string,
                        text?: string,
                        image? : string
                    }]>)

                    const messagesData = rawData[0][1].map((message) => { // array of all messages in the chat
                        // maps through array containing message data
                        return (
                            <>
                                <Message message={message} />
                            </>
                        )
                    })

                    setMessages(messagesData)
                })

                return () => {
                    unSub()
                }
            }
        } catch (err) {
            const errorMessage = (err as Error).message
            toast.error(`${errorMessage}`)
        }

    }, [selectedChat])

    useEffect(() => {
        if (messagesRef.current) {
            // scroll to the bottom of messages when a new message is added
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [messages])


    return (
        <>
            <div className="messages" ref={messagesRef} >
                {messages}
            </div>
        </>
    )
}

export default Messages