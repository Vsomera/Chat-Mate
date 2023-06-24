import Sidebar from "../components/chat/Sidebar"
import Chat from "../components/chat/Chat"

const ChatPage = () => {
    return (
        <div className="background">
            <div className="chat-container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default ChatPage