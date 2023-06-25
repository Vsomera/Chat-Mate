import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"
import { HiOutlineSearch } from "react-icons/hi"
import Search from "./Search"


const SideTopbar = () => {

    const { user } = useContext(UserContext)
    const [toggleSearch, setToggleSearch] = useState(false)

    return (
        <div className="side-topbar">
            <div className="side-content">
                <h2>
                    <img src={user?.photoURL || ""} className="profile-img" /> Chats
                </h2>

                <h3 onClick={
                    () => toggleSearch 
                        ? setToggleSearch(false) 
                        : setToggleSearch(true)}>
                            <HiOutlineSearch className="search-icon" /></h3>
            </div>
            { toggleSearch && <Search /> }
        </div>
    )
}

export default SideTopbar
