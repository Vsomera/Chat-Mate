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
    setChatName: SetStateFunction<string>) => {

    // gets the current signed in user
    const user = auth.currentUser

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

        rawData.map((chatData) => {
            if (chatData[0] === chatId) {
                // update the selected chat states for global app use
                setChatUsers(chatData[1].chatUsers)
                setChatName(chatData[1].chatName)
            }
        })
    }
}

export const ChatContext = createContext<{
    selectedChat: string, 
    setSelectedChat: SetStateFunction<string>, 
    chatUsers: User[], 
    chatName: string, 
}>
    ({
        selectedChat: "", // holds the chatId
        setSelectedChat: () => { null },
        // chatUsers and chatName changes depending on the selectedChat chatId
        chatUsers: [],
        chatName: "",
    })

export const ChatContextProvider: FC<Props> = ({ children, initial = "" }) => {
    const [selectedChat, setSelectedChat] = useState(initial)
    const [chatUsers, setChatUsers] = useState<User[]>([])
    const [chatName, setChatName] = useState("")

    useEffect(() => {
        // fetches data when selectedChat changes
        fetchRawData(selectedChat, setChatUsers, setChatName)
    }, [selectedChat]) 

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat, chatUsers, chatName }}>
            {children}
        </ChatContext.Provider>
    )
}
