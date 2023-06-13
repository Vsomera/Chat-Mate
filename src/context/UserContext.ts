import { createContext } from "react"
import { User } from "firebase/auth"

interface UserContextType {
    user : User | null
}

export const UserContext = createContext<UserContextType>({
    user : null  // a valid User from Firebase or null if no user is logged in
})