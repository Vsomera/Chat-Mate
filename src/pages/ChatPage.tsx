import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { auth } from "../config/firebase"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FormEvent } from "react"
import { sendMessage } from "../services/chatService"

const ChatPage = () => {

    const [room, setRoom] = useState("")    
    const [message, setMessage] = useState("")
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    const onSubmit = async (e : FormEvent) => {
        e.preventDefault()

        if (auth.currentUser) {
            // sends the message to the specified room
            await sendMessage(auth.currentUser, message, room)
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