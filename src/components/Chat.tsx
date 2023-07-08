import ChatTopbar from "./ChatTopbar"
import { useContext } from "react"
import { ChatContext } from "../context/chatContext"

const Chat = () => {

    const { chatId } = useContext(ChatContext)

    return (
        <main>
            <ChatTopbar />
            {chatId}
        </main>
    )
}

export default Chat
