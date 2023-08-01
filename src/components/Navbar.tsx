import { FaSignInAlt, FaRegUser, FaSignOutAlt, FaRocketchat } from "react-icons/fa"
import { useState, useEffect, useContext } from "react"
import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { ChatContext } from "../context/chatContext"

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const { setSelectedChat } = useContext(ChatContext)

    useEffect(() => {
        // Checks if a user is logged in
        auth.onAuthStateChanged((user)=> {
            if (user != null) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        })
    })

    const logout = async () => {
        try {
            // logs out the currently logged in user
            setSelectedChat("")
            await signOut(auth)
            toast.success("Successfully Logged Out")
            console.log("Successfully logged out")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <nav>
                <div className="nav-content">
                    <div id="title">
                        <Link to="/">
                            <h1>
                                <FaRocketchat className="icon" /> Chat<a>Mate</a>
                            </h1>
                        </Link>
                    </div>

                    <ul>
                        { !isLoggedIn &&
                            <>
                                <li>
                                    <Link className="nav-link" to="/login">
                                        <FaSignInAlt className="icon" />  Login
                                    </Link>
                                </li>
                                <li>
                                    <Link className="nav-link" to="/register">
                                        <FaRegUser className="icon" />  Register
                                    </Link>
                                </li>
                            </>
                        }
                        { isLoggedIn &&
                            <li onClick={logout}>
                                <Link className="nav-link" to="/login">
                                    <FaSignOutAlt className="icon" />  LogOut
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav >
        </>
    )
}

export default Navbar