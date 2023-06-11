import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, gitHubProvider, googleProvider, microsoftProvider } from "../config/firebase"
import { toast } from "react-toastify"
import { signInWithPopup } from "firebase/auth"

export const registerEmailPassword = async (
    username: string,
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

export const signInGoogle = async () => {
    try {
        // logs in a user using google account
        const user = await signInWithPopup(auth, googleProvider)
        toast.success(`Welcome ${user.user.displayName}`)
    } catch (err: unknown) {
        if (err instanceof Error) {
            toast.error(err.message)
        } else {
            toast.error('Error : Could not log in with Google')
        }
    }
}


export const signInGithub = async () => {
    try {
        // logs in a user using gitHub account
        const user = await signInWithPopup(auth, gitHubProvider)
        toast.success(`Welcome ${user.user.displayName}`)
    } catch (err: unknown) {
        if (err instanceof Error) {
            toast.error(err.message)
        } else {
            toast.error('Error : Could not log in with Github')
        }
    }
}
export const signInMS = async () => {
    try {
        // logs in a user using Microsoft account
        const user = await signInWithPopup(auth, microsoftProvider)
        toast.success(`Welcome ${user.user.displayName}`)

    } catch (err: unknown) {
        if (err instanceof Error) {
            toast.error(err.message)
        } else {
            toast.error('Error : Could not log in with Microsoft')
        }
    }
}
