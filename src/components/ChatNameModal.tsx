import { useContext, useState, useEffect } from "react"
import { ChatContext } from "../context/chatContext"
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

    
    const handleContainerClick = (e :  React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            props.setIsOpen(false)
        }
    }

    return (
        <>
            {props.modalIsOpen &&
                <div className="modal" onClick={handleContainerClick}>
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
                                {chatName !== newChatName
                                    && newChatName.concat().trim() !== "" &&
                                    <button onClick={() => handleConfirm()}>
                                        Save
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