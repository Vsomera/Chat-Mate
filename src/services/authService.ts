import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { db, storage, auth, gitHubProvider, googleProvider, microsoftProvider } from "../config/firebase"
import { toast } from "react-toastify"
import { signInWithPopup } from "firebase/auth"
import { UserCredential } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { ref, uploadBytesResumable } from "firebase/storage"

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
        await addUsertoDb(newUser) // adds user to firestore database
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
        await addUsertoDb(user)
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
        await addUsertoDb(user)
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
        await addUsertoDb(user)
        toast.success(`Welcome ${user.user.displayName}`)

    } catch (err: unknown) {
        if (err instanceof Error) {
            toast.error(err.message)
        } else {
            toast.error('Error : Could not log in with Microsoft')
        }
    }
}

const addUsertoDb = async (userInfo: UserCredential) => {
    try {
        // adds a new user to firestore user database
        const user = userInfo.user

        await uploadUserProfileImage(user.photoURL, user.uid) // adds user pfp to storage

        await setDoc(doc(db, "users", user.uid), {
            // adds a document with the user data
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL ? user.photoURL : null // checks if a user has a profile picture
        })

    } catch (err: unknown) {
        if (err instanceof Error) {
            toast.error(err.message)
        } else {
            toast.error(`Error : Could not add user data to database`)
        }
    }
}

const uploadUserProfileImage = async (photoURL: string | null, uid : string | null) => {
    try {

        if (photoURL) {
            // if user has a profile picture, upload it to firebase storage\

            const toDataURL = (photoURL: string) => fetch(photoURL)
                // converts the photoURL into dataURL
                .then(res => res.blob())
                .then(blob => new Promise<string>((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result as string)
                    reader.onerror = reject
                    reader.readAsDataURL(blob)
                }))

            const dataURLtoFile = (toDataURL : string, user : string) => {
                // converts dataURL to a file
                const arr = toDataURL.split(",")
                const matchResult = arr[0].match(/:(.*?);/)
                const mime = matchResult ? matchResult[1] : ''
                const bstr = atob(arr[1])
                let n = bstr.length
                const u8arr = new Uint8Array(n)
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new File([u8arr], user, {type:mime})
                }


            if (uid) {
                // uploads the converted file as a jpg to firebase storage
                const fileDataUrl = await toDataURL(photoURL)
                const file = dataURLtoFile(fileDataUrl, `${uid}.jpg`)
                const storageRef = ref(storage, uid)
                await uploadBytesResumable(storageRef, file)
            }
        }

    } catch (error) {
        console.error("Error uploading user profile image:", error);
    }
}
