import { useContext, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { UserContext } from "../context/userContext"
import { db } from "../config/firebase"
import { User } from "firebase/auth"
import ReactLoading from 'react-loading'
import SelectedUsers from "./SelectedUsers"
// import { Checkbox } from "./Checkbox"

const Search = () => {

    const { user } = useContext(UserContext)

    const [searchedUsername, setSearchedUsername] = useState("")
    const [searchedUsers, setSearchedUsers] = useState<User[]>([])
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]) // array for holding the selected users
    const [showNoUsers, setShowNoUsers] = useState(false) // state for hiding and showing "no users found" text
    const [isLoading, setIsLoading] = useState(false)

    const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // on enter key down -> search for users
            setIsLoading(true)
            await searchUsers()
            setIsLoading(false)
        }
    }

    const handleSelect = (otherUser: User) => {
        // check if the user is already selected
        const userExists = selectedUsers.some(selectUser => selectUser.uid === otherUser.uid)

        if (!userExists) {
            // adds user to state if the user doesn't exist
            setSelectedUsers([...selectedUsers, otherUser])
        } else {
            // remove the user from the state if the user already exists
            const removeUser = selectedUsers.filter((selectUsers) => otherUser.uid !== selectUsers.uid)
            setSelectedUsers(removeUser)
        }

    }

    const searchUsers = async () => {
        const q = query(collection(db, "users"),
            // fetches users where the displayName is like the searchedUsername state
            where("displayName", ">=", searchedUsername),
            where("displayName", "<=", searchedUsername + "uf8ff"))

        if (searchedUsername.length > 1) {
            const qSnapshot = await getDocs(q)
            const users: User[] = []

            qSnapshot.forEach((doc) => {
                // loops through users collection and pushes user data to users array
                users.push(doc.data() as User)
            })

            setShowNoUsers(true)
            setSearchedUsers(users)
            setSearchedUsername("")
        }
    }

    return (
        <div className="search">

            <input
                type="text"
                className="auth-input"
                value={searchedUsername}
                onChange={e => setSearchedUsername(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Search for User..." />
            <div className="underline"></div>

            <div className="searched-users">

                {!isLoading
                    ? searchedUsers.length > 0 && searchedUsers[0]?.uid != user?.uid ?
                        searchedUsers
                            .filter((otherUser: User) => otherUser.uid != user?.uid) // filters out the signed-in user on search
                            .map((otherUser: User) => {
                                return (
                                    <div
                                        className={`searched-container 
                                            ${selectedUsers.some(selectUser => selectUser.uid === otherUser.uid) // checks if user is in the selectUser state array
                                                // animate border outline if user is selected
                                                ? "user-selected" 
                                                : "user-deselected"}`}
                                        onClick={() => handleSelect(otherUser)}
                                        key={otherUser.uid} >
                                        <img
                                            src={otherUser.photoURL || ""}
                                            className="profile-img" />
                                        <div className="searched-user-info">
                                            <p>{otherUser.displayName}</p>
                                            <p>{otherUser.email}</p>
                                        </div>
                                    </div>
                                )
                            })
                        : showNoUsers && <div>no users found</div>

                    : <ReactLoading
                        className="loading"
                        type={"bubbles"}
                        color={"white"} />
                }

            </div>
            <SelectedUsers
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers} />
        </div>
    )
}

export default Search
