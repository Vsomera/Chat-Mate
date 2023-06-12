import { addDoc, serverTimestamp, collection } from "firebase/firestore"
import { toast } from "react-toastify"
import { User } from "firebase/auth"
import { db } from "../config/firebase"

//  Acessing the messages database
const messagesRef = collection(db, "messages") 

export const sendMessage = async (
    user: User,
    message: string,
    room: string) => {
    // sends message to specified room in firebase
    if (message !== "" || room !== "") {
        await addDoc(messagesRef, {
            text: message,
            createdAt: serverTimestamp(),
            user: user.uid,
            room: room // room that the message will be send to
        })
    } else {
        toast.error("Please enter a room or message")
    }
}

// BACKEND PROCESS

// 1. user create a chat room with an id and an array containing users
// 2. users can select other users to be invited to the chat room from a drop down menu 

// 3. chat room has an array containing ids of the users that can access the room
// 4. chat room has an array containing the messages that will be seen to all users in the room

// 5. when a user sends a message, access the correct chat room id and push message to message array of the chat room