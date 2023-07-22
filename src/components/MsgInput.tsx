import { useState, useContext } from "react"
import { BsSendFill } from "react-icons/bs"
import { UserContext } from "../context/userContext"
import { sendNewMessage } from "../services/chatService"
import { ChatContext } from "../context/chatContext"


const MsgInput = () => {

    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { selectedChat } = useContext(ChatContext)
    const { user } = useContext(UserContext)

    const sendMessage = async () => {
        // send a message to the database
        if (message) {
            setIsLoading(true)
            await sendNewMessage(user?.uid, message, selectedChat)
            setIsLoading(false)
        }
        console.log(isLoading)
    }

    return (
        <>
            <div className="msg-input">
                <div className="input-container">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text" />
                    <BsSendFill
                        className="send-icon"
                        onClick={() => sendMessage()} />
                </div>
            </div>
        </>
    )
}

export default MsgInput
