import { User } from "firebase/auth"
import { db } from "../config/firebase"
import { toast } from "react-toastify"
import { setDoc, getDoc, doc, serverTimestamp, arrayUnion, Timestamp, updateDoc } from "firebase/firestore"

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
                result[i] = (result[i] || "") + userId[i]
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
                        displayName: chatUser.displayName,
                        photoURL: chatUser.photoURL,
                        uid: chatUser.uid
                    }))

                // creates a chatName based on the number of users in the chatUsers array
                const chatName = chatUsers.length > 1 ? "New Group Chat" : chatUsers[0].displayName

                await setDoc(doc(db, "userChats", user.uid), {
                    // creates a new userChat for each user
                    [combinedId]: {
                        chatName: chatName,
                        date: serverTimestamp(),
                        lastMessage: "Chat created 🎉",
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

export const sendNewMessage = async (sender: string | undefined, message: string, selectedChat: string, chatUsers: User[]) => {
    try {
        // send a new message to firebase firestore in messages array
        if (sender) {

            const formattedDate = Timestamp.now().toDate().toLocaleString(undefined, {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });

            // update the last message
            chatUsers.map(async (user) => {
                await setDoc(doc(db, "userChats", user.uid), {
                    [selectedChat]: {
                        lastMessage: `${message} ◦ ${formattedDate}`
                    }
                }, { merge: true })
            })

            // send new message to the database
            await updateDoc(doc(db, "chats", selectedChat), {
                messages: arrayUnion({
                    date: Timestamp.now(),
                    senderId: sender,
                    text: message
                })
            })

        } else {
            console.log("Invalid user")
        }
    } catch (err: unknown) {
        console.log(err)
    }
}