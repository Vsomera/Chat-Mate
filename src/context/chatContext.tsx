import { FC, ReactNode, createContext, useState, useEffect } from "react"
import { Timestamp, doc, getDoc } from "firebase/firestore"
import { db, auth } from "../config/firebase"
import { User } from "firebase/auth"

type SetStateFunction<T> = (newValue: T | ((prevValue: T) => T)) => void

interface Props {
    children: ReactNode
    initial?: string
}

const fetchRawData = async (
    chatId: string,
    setChatUsers: SetStateFunction<User[]>,
    setChatName: SetStateFunction<string>,
    setIsLoading: SetStateFunction<boolean>) => {

    setIsLoading(true)

    // gets the current signed in user
    const user = auth.currentUser
    try {
        if (user) {
            // fetch selected data from firestore database
            const docRef = doc(db, "userChats", user.uid)
            const docSnap = await getDoc(docRef)

            const rawData = Object.entries(docSnap.data() as Record<string, { // array of all chats
                chatName: string,
                lastMessage: string,
                chatUsers: User[],
                date: Timestamp
            }>)

            if (chatId !== "") {
                rawData.map((chatData) => {
                    if (chatData[0] === chatId) {
                        // update the selected chat states for global app use
                        setChatUsers(chatData[1].chatUsers)
                        setChatName(chatData[1].chatName)
                    }
                })
            } else {
                // resets both states
                setChatName("")
                setChatUsers([])
            }
        }
    } catch (err: unknown) {
        console.log("Could not fetch chat Data", err)
    }

    setIsLoading(false)
}

export const ChatContext = createContext<{
    selectedChat: string,
    setSelectedChat: SetStateFunction<string>,
    chatUsers: User[],
    chatName: string,
    isLoading: boolean
}>
    ({
        selectedChat: "", // holds the chatId
        setSelectedChat: () => { null }, // for changing the selected chatId globally
        // chatUsers and chatName changes depending on the selectedChat chatId
        chatUsers: [],
        chatName: "",
        isLoading: false
    })

export const ChatContextProvider: FC<Props> = ({ children, initial = "" }) => {
    const [selectedChat, setSelectedChat] = useState(initial)
    const [chatUsers, setChatUsers] = useState<User[]>([])
    const [chatName, setChatName] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // fetches data when selectedChat changes
        fetchRawData(selectedChat, setChatUsers, setChatName, setIsLoading)
    }, [selectedChat])

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat, chatUsers, chatName, isLoading }}>
            {children}
        </ChatContext.Provider>
    )
}
