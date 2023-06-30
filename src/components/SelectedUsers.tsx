import { User } from "firebase/auth"
import { IoClose } from "react-icons/io5"
import { BsSendFill } from "react-icons/bs"
import { useState, useContext } from "react"
import ReactLoading from 'react-loading'
import { createNewChat } from "../services/chatService"
import { UserContext } from "../context/userContext"

interface Props {
    selectedUsers: User[]
    setSelectedUsers: (users: User[]) => void
}

const SelectedUsers = (props: Props) => {

    const { user } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)

    const removeSelected = (selectedUser: User) => {
        // removes users from selected users state
        const removeUser = props.selectedUsers.filter((user) => selectedUser.uid !== user.uid)
        props.setSelectedUsers(removeUser)
    }

    const handleSend = async () => {
        // loop through all users in selectedUsers array state
        // combine all user id's together
        // create a document in userChats collection with user id as a doc id and add combined id to the document
        // create a document in chats collection with the combined user id's as the doc id

        if (user && props.selectedUsers) {
            setIsLoading(true)
            await createNewChat([...props.selectedUsers, user])
            setIsLoading(false)
        }
    }

    return (
        <>
            {props.selectedUsers.length > 0 &&
                <div className="selected-container">
                    <div className="selected-users">
                        {props.selectedUsers.map((user: User) => {
                            return (
                                <div className="selected-user" key={user.uid}>
                                    <IoClose
                                        className="remove-icon"
                                        onClick={() => removeSelected(user)} />
                                    <p>{user.displayName}</p>
                                </div>
                            )
                        })}
                    </div>
                    {
                        isLoading
                            ? <ReactLoading
                                className="send-icon"
                                height={"20px"}
                                width={"20px"}
                                type="spin" />
                            : <BsSendFill
                                className="send-icon"
                                onClick={() => handleSend()} />
                    }
                </div>
            }
        </>
    )
}

export default SelectedUsers
