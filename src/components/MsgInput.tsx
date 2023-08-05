import { useState, useContext, useEffect } from "react"
import EmojiPicker, {
    EmojiStyle,
    EmojiClickData,
} from "emoji-picker-react";
import { BiImageAdd } from "react-icons/bi"
import { HiEmojiHappy } from "react-icons/hi"
import { BsSendFill } from "react-icons/bs"
import { UserContext } from "../context/userContext"
import { sendNewImage, sendNewMessage } from "../services/chatService"
import { ChatContext } from "../context/chatContext"
import { toast } from "react-toastify";


const MsgInput = () => {


    const { selectedChat, chatUsers } = useContext(ChatContext)
    const { user } = useContext(UserContext)

    const [message, setMessage] = useState("")

    const [image, setImage] = useState<File | null>(null)
    const [imageURL, setImageURL] = useState<string | null>(null)

    const [showEmojiPicker, setEmojiPicker] = useState(false)

    const sendMessage = async () => {
        try {
            if (message.trim() !== "" && image) {
                await sendImage()
                sendText()
            } else if (image) {
                sendImage()
            } else if (message.trim() !== "") {
                sendText()
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                return toast.error(err.message)
            }
        }

    }

    const sendText = async () => {
        // send a message to the database
        if (user) {
            await sendNewMessage(user?.uid, message, selectedChat, [...chatUsers, user])
            setMessage("")
            setEmojiPicker(false)
        }
    }

    const sendImage = async () => {
        if (image && user) {
            // sends a new image to chats database
            try {
                await sendNewImage(image, selectedChat, user?.uid || "", [...chatUsers, user])
                setImage(null)
                setImageURL("")
            } catch (err: unknown) {
                if (err instanceof Error) {
                    return toast.error(err.message)
                }
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

    useEffect(() => {
        if (image) {
            setImageURL(URL.createObjectURL(image)) // show the selected image in the msg-input component
            console.log(image)
        }
    }, [image])

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

                        {imageURL &&
                            <img
                                src={imageURL || ""}
                                className="img-toSend"
                                style={{ maxWidth: '300px' }}
                            />}

                        <input
                            id="file"
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files?.[0] || null)} />
                        <label
                            htmlFor="file"
                            style={{ display: "flex" }}>
                            <BiImageAdd
                                className="addImage-icon"
                            />
                        </label>

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
