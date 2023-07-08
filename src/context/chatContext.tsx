import { FC, ReactNode, createContext, useState } from "react"

type SetStateFunction<T> = (newValue: T | ((prevValue: T) => T)) => void

interface Props {
    children: ReactNode
    initial?: string
}

export const ChatContext = createContext<{ selectedChat: string; setSelectedChat: SetStateFunction<string>}>({
    selectedChat: "", // holds the chatId
    setSelectedChat: () => {null}
})

export const ChatContextProvider: FC<Props> = ({ children, initial = "" }) => {
    const [selectedChat, setSelectedChat] = useState(initial)

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </ChatContext.Provider>
    )
}