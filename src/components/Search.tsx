import { useContext, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { UserContext } from "../context/userContext"
import { db } from "../config/firebase"
import { User } from "firebase/auth"
import ReactLoading from 'react-loading';

const Search = () => {

    const { user } = useContext(UserContext)

    const [searchedUsername, setSearchedUsername] = useState("")
    const [searchedUsers, setSearchedUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // on enter key down -> search for users
            setIsLoading(true)
            await searchUsers()
            setIsLoading(false)
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

                {searchedUsers
                    .filter((otherUser: User) => otherUser.uid != user?.uid) // filters out the signed in user on search
                    .map((otherUser: User) => {
                        return (
                            <div className="searched-user" key={otherUser.uid}>
                                <div className="searched-container">
                                    <img
                                        src={otherUser.photoURL || ""}
                                        className="profile-img" />
                                    <div className="searched-user-info">
                                        <p>{otherUser.displayName}</p>
                                        <p>{otherUser.email}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Search
