import { useContext, useState } from "react"
import ReactLoading from "react-loading"
import { BsCameraVideo } from "react-icons/bs"
import { AiOutlineEdit } from "react-icons/ai"
import { IoMdClose } from "react-icons/io"
import { ChatContext } from "../context/chatContext"
import GroupProfileImg from "./GroupProfileImg"
import { toast } from "react-toastify"
import ChatNameModal from "./ChatNameModal"

const ChatTopbar = () => {

    const { chatName, chatUsers, selectedChat, setSelectedChat, isLoading } = useContext(ChatContext)

    const [modalIsOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className="chat-topbar">
            <div className="top-content">
                <div className="chat-name">

                    <div className="img-container">
                        {selectedChat &&
                            !isLoading && chatUsers[0]?.photoURL ? // show loading icon when fetching chat and when pfp is not available
                            chatUsers.length <= 1
                                ? <img
                                    className="chat-img"
                                    src={chatUsers[0]?.photoURL || ""}
                                    referrerPolicy="no-referrer"
                                    alt="" />
                                : <GroupProfileImg chatUsers={[chatUsers[0], chatUsers[1]]} />
                            : <>{isLoading &&
                                <> <ReactLoading height={"100%%"} width={"100%"} type="spin" /></>}</>
                        }
                    </div>

                    <p>{isLoading ? 
                            selectedChat ? <>Fetching Chat...</>
                            : <>Closing Chat...</>
                        : chatName && chatName}</p>
                </div>

                <div className="chat-options">
                    {selectedChat &&
                        <>
                            <BsCameraVideo onClick={() => toast.warning("Work In Progress")}/>
                            {chatUsers.length > 1 && < AiOutlineEdit onClick={() => setIsOpen(true)} /> }
                            {modalIsOpen && <ChatNameModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>}
                            <IoMdClose onClick={() => setSelectedChat("")} />
                        </>
                    }
                </div>

            </div>
        </div>
    )
}

export default ChatTopbar
