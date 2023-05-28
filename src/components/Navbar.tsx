import { FaSignInAlt, FaRegUser, FaSignOutAlt, FaRocketchat } from "react-icons/fa"
import { Link } from "react-router-dom"

const Navbar = () => {
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
                        <li>
                            <Link className="nav-link" to="/login">
                                <FaSignOutAlt className="icon" />  LogOut
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar