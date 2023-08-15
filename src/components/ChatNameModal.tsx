import { useContext, useState, useEffect } from "react"
import { ChatContext } from "../context/chatContext"
import { MdOutlineClose } from "react-icons/md"
import { AiOutlineCheck } from "react-icons/ai"
import { changeChatName } from "../services/chatService"
import { UserContext } from "../context/userContext"
import { toast } from "react-toastify"

interface Props {
    modalIsOpen: boolean
    setIsOpen: (arg: boolean) => void
}

const ChatNameModal = (props: Props) => {

    const { user } = useContext(UserContext)
    const { selectedChat, chatName, chatUsers, setChatName } = useContext(ChatContext)
    const [newChatName, setNewChatName] = useState("")

    useEffect(() => {
        setNewChatName(chatName)
    }, [chatName])

    const handleConfirm = async () => {
        if (user) {
            setChatName(newChatName)
            await changeChatName(selectedChat, newChatName, [...chatUsers, user])
            props.setIsOpen(false)   
            toast.success("Name Change Successful")
        }
    }

    return (
        <>
            {props.modalIsOpen &&
                <div className="modal">
                    <div className="modal-container">
                        <div className="modal-wrapper">
                            <div className="edit-pf-divider"><p>Change Group Name</p></div>
                            <p className="modal-text">Changing the name of a group chat changes it for everyone.</p>

                            <div className="modal-input-container">
                                <input
                                    placeholder="Enter a new Chat Name"
                                    value={newChatName}
                                    onChange={(e) => setNewChatName(e.target.value)}
                                    className="modal-input"
                                />
                                <div className="underline"></div>
                            </div>

                            <div className="modal-btns">
                                <button onClick={() => props.setIsOpen(false)}>
                                    <MdOutlineClose />
                                </button>
                                {chatName !== newChatName
                                    && newChatName.concat().trim() !== "" &&
                                    <button onClick={() => handleConfirm()}>
                                        <AiOutlineCheck />
                                    </button>}
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ChatNameModal