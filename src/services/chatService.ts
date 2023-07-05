import { User } from "firebase/auth"
import { db } from "../config/firebase"
import { toast } from "react-toastify"
import { setDoc, getDoc, doc, serverTimestamp } from "firebase/firestore"

export const createNewChat = async (users: User[]) => {

    const checkChatExists = async (chatId: string) => {
        // checks if the chatId already exists in database
        const docRef = doc(db, "chats", chatId)
        const docSnap = await getDoc(docRef)

        return docSnap.exists()
    }

    const userIds = users.map((user) => user.uid) // array of all user ids

    const combinedId = userIds
        // creates a combined id from all the users in the array
        .sort((a, b) => a.localeCompare(b)) // sorts array alphabetically
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)) // sorts array numerically
        .reduce((result, userId) => {
            for (let i = 0; i < userId.length; i++) {

                if (result.join("").length < 56) {
                    result[i] = (result[i] || "") + userId[i]

                } else {
                    break // stop when id reaches 56 characters
                }
            }
            return result
        }, ['']).join("")

    if (!await checkChatExists(combinedId)) {

        try {

            // creates a new empty chat 
            await setDoc(doc(db, "chats", combinedId), {
                messages: []
            })

            // creates a new chat for each user(s) in the array
            users.map(async (user) => {

                const chatUsers = users.filter((chatUser) => chatUser.uid !== user.uid) 
                    // array of chat users excluding the currentUser
                    .map((chatUser) => ({
                        displayName : chatUser.displayName,
                        photoURL : chatUser.photoURL,
                        uid : chatUser.uid
                    }))

                await setDoc(doc(db, "userChats", user.uid), {
                    // creates a new userChat for each user
                    [combinedId]: {
                        date: serverTimestamp(),
                        lastMessage: "",
                        chatUsers: chatUsers
                    }
                }, { merge: true })

            })

            return toast.success("Chat Created")

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err)
            }
        }

    } else {
        return toast.error("Chat already exists")
    }
}