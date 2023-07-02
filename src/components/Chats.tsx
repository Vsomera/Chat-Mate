import { UserContext } from "../context/userContext"
import { useContext, useState } from "react"
import { User } from "firebase/auth"

interface Props {
    toggleView: boolean
    setToggleView: (arg: boolean) => void
}

const Chats = (props: Props) => {

    const { user } = useContext(UserContext)
    const [userChats, setUserChats] = useState<User[]>([])

    return (
        <>
            {!props.toggleView && // if false show chats
                <div className="chats">

                    <div className="userChat">
                        <img
                            className="chat-img"
                            src={user?.photoURL || ""}
                            alt="" />
                        <div className="chat-info">
                            <p>Chat Name</p>
                            <p>last message</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Chats