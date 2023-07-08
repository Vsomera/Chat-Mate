import ChatTopbar from "./ChatTopbar"
import { useContext } from "react"
import { ChatContext } from "../context/chatContext"

const Chat = () => {

    const { chat } = useContext(ChatContext)

    return (
        <main>
            <ChatTopbar />
            {chat}
        </main>
    )
}

export default Chat
