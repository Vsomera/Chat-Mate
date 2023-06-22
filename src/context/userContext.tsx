import { FC, ReactNode, createContext, useEffect, useState } from "react"
import { User } from "firebase/auth"
import { auth } from "../config/firebase"

interface UserContextType {
    user: User | null
}

interface Props {
    children: ReactNode
    initial?: null
}

export const UserContext = createContext<UserContextType>({
    user: null  // a valid User from Firebase or null if no user is logged in
})

export const UserContextProvider: FC<Props> = ({ children, initial = null }) => {
    const [user, setUser] = useState<User | null>(initial)

    useEffect(() => {
        const unSub = auth.onAuthStateChanged((user) => {
            // checks if a user is logged in from firebase
            if (user != null) {
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return () => {
            unSub()
        }
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )


}