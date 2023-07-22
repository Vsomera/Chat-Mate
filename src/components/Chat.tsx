import ChatTopbar from "./ChatTopbar"
import Messages from "./Messages"
import MsgInput from "./MsgInput"

const Chat = () => {

    return (
        <main>
            <div className="main-content">
                <ChatTopbar />
                <Messages />
                <MsgInput />
            </div>
        </main>
    )
}

export default Chat
