import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../config/firebase"
import { useContext, useEffect, useState } from "react"
import { Timestamp } from "firebase/firestore"
import { UserContext } from "../context/userContext"
import { ChatContext } from "../context/chatContext"

interface Props {
    message: {
        id: string,
        date: Timestamp,
        senderId: string,
        text: string
    }
}

const Message = (props: Props) => {

    const { id, date, senderId, text } = props.message
    const { user } = useContext(UserContext)
    const [pfpUrl, setPfpUrl] = useState("")
    const { selectedChat, isLoading } = useContext(ChatContext)

    // convert date into human readable format
    const formattedDate = date && date.toDate().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });


    useEffect(() => {
        // gets the profile picture of a user from firebase storage
        const storageRef = ref(storage, senderId)

        // get the Url of the image
        getDownloadURL(storageRef)
            .then((url) => {
                setPfpUrl(url)
            })
    })

    return (
        <>
            {selectedChat && !isLoading &&
                <div className={`message ${senderId === user?.uid && "me"}`} key={id}>

                    { user?.uid !== senderId &&
                        <img
                            className="msg-pfp"
                            src={pfpUrl}
                            referrerPolicy="no-referrer"
                            alt="" />
                    }

                    <div className={`msg-content ${user?.uid == senderId && "me"}`}>
                        <div className="msg-text">
                            <p>{text}</p>
                        </div>
                        <p>{formattedDate}</p>
                    </div>

                </div>
            }
        </>
    )
}

export default Message