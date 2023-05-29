import { auth } from "../config/firebase"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ChatPage = () => {

    const navigate = useNavigate()
    
    useEffect(() => {
       auth.onAuthStateChanged((user) => {
        if (user == null) {
            navigate("/login")
        }
       })

        console.log(auth.currentUser)

    }, [navigate])

    return (
        <div className="chat-container">
            Chat Dashboard
        </div>
    )
}

export default ChatPage