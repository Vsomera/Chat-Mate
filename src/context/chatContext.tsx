import { FC, ReactNode, createContext, useState } from "react"

type SetStateFunction<T> = (newValue: T | ((prevValue: T) => T)) => void

interface Props {
    children: ReactNode
    initial?: string
}

export const ChatContext = createContext<{ chat: string; setChat: SetStateFunction<string>}>({
    // default values for chatId
    chat: "",
    setChat: () => {null}
})

export const ChatContextProvider: FC<Props> = ({ children, initial = "" }) => {
    const [chat, setChat] = useState(initial)

    return (
        <ChatContext.Provider value={{ chat, setChat }}>
            {children}
        </ChatContext.Provider>
    )
}