import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../config/firebase"
import { toast } from "react-toastify"

export const registerEmailPassword = async (
    username : string,
    email: string,
    password: string) => {

    try {
        // registers a user into firebase with email and password
        const newUser = await createUserWithEmailAndPassword(auth, email, password)

        // set display name to the username
        await updateProfile(newUser.user, {
            displayName: username
        })

        toast.success(`Welcome ${username}`)

    } catch (err) {
        const errorMessage = (err as Error).message
        toast.error(`${errorMessage}`)
    }
    console.log(auth.currentUser)
}
