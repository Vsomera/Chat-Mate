import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { useState } from "react"
import { FormEvent } from "react"
import { sendMessage } from "../services/chatService"

const ChatPage = () => {

    const { user } = useContext(UserContext)

    const [room, setRoom] = useState("")    
    const [message, setMessage] = useState("")

    const onSubmit = async (e : FormEvent) => {
        e.preventDefault()

        if (user) {
            // sends the message to the specified room
            await sendMessage(user, message, room)
            setMessage("")
            setRoom("")
        }
    }

    return (
        <div className="background">
            <div className="chat-container">
                <div className="chat-content">
                   <form className="new-msg-form">
                        <input 
                            className="new-msg-input" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text" 
                            placeholder="Type Message"/>
                        <input 
                            className="new-room-input" 
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            type="text" 
                            placeholder="Type room"/>
                        <button onClick={onSubmit}>Send</button>
                   </form>
                </div>
            </div>
        </div>
    )
}

export default ChatPage