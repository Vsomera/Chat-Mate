import Sidebar from "../components/Sidebar"
import Chat from "../components/Chat"

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