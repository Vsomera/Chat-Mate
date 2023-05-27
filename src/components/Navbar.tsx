import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <nav>
                <div className="nav-content">
                    <div>
                        <h1>ChatMate</h1>
                    </div>

                    <ul>
                        <li>
                            <Link to="/login"> 
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register"> 
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar