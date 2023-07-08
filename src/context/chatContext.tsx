import { FC, ReactNode, createContext, useState } from "react"

type SetStateFunction<T> = (newValue: T | ((prevValue: T) => T)) => void

interface Props {
    children: ReactNode
    initial?: string
}

export const ChatContext = createContext<{ chatId: string; setChatId: SetStateFunction<string>}>({
    // default values for chatId
    chatId: "",
    setChatId: () => {null}
})

export const ChatContextProvider: FC<Props> = ({ children, initial = "" }) => {
    const [chatId, setChatId] = useState(initial)

    return (
        <ChatContext.Provider value={{ chatId, setChatId }}>
            {children}
        </ChatContext.Provider>
    )
}