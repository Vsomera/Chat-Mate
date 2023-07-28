import { useState, useContext } from "react"
import EmojiPicker, {
    EmojiStyle,
    EmojiClickData,
} from "emoji-picker-react";
import { HiEmojiHappy } from "react-icons/hi"
import { BsSendFill } from "react-icons/bs"
import { UserContext } from "../context/userContext"
import { sendNewMessage } from "../services/chatService"
import { ChatContext } from "../context/chatContext"


const MsgInput = () => {

    const [message, setMessage] = useState("")
    const [showEmojiPicker, setEmojiPicker] = useState(false)
    const { selectedChat, chatUsers } = useContext(ChatContext)
    const { user } = useContext(UserContext)

    const sendMessage = async () => {
        // send a message to the database
        if (user) {
            if (message.trim() !== "") {
                await sendNewMessage(user?.uid, message, selectedChat, [...chatUsers, user])
                setMessage("")
                setEmojiPicker(false)
            }
        }
    }

    const selectEmoji = (emojiData: EmojiClickData) => {
        // convert emoji unicode to emoji character
        const emoji = String.fromCodePoint(...emojiData.unified.split('-')
            .map(hex => parseInt(hex, 16)))

        // append emoji to the current message state
        setMessage(`${message}${emoji}`)
    }

    return (
        <>
            {selectedChat &&
                <div className="msg-input">
                    <div className="input-container">

                        {showEmojiPicker &&
                            <div className="emoji-picker">
                                <EmojiPicker
                                    emojiStyle={EmojiStyle.NATIVE}
                                    onEmojiClick={selectEmoji} />
                            </div>
                        }

                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text" />
                        <HiEmojiHappy
                            className="emoji-icon"
                            onClick={() => showEmojiPicker
                                ? setEmojiPicker(false)
                                : setEmojiPicker(true)} />
                        <BsSendFill
                            className="send-icon"
                            onClick={() => sendMessage()} />
                    </div>
                </div>
            }
        </>
    )
}

export default MsgInput
