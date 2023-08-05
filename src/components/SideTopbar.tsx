import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { HiOutlineSearch } from "react-icons/hi"
import { MdOutlineClose } from "react-icons/md"
import Search from "./Search"

interface Props {
    toggleView: boolean
    setToggleView: (arg: boolean) => void
}

const SideTopbar = (props: Props) => {

    const { user } = useContext(UserContext)

    return (
        <div className="side-topbar">
            <div className="side-content">
                <h2>
                    {user?.photoURL
                        ? <>
                            <img src={user?.photoURL || ""} referrerPolicy="no-referrer" className="profile-img" />
                            {user?.displayName}
                          </>
                        : <p>Start Chatting with People! 👉</p>
                    }
                </h2>

                <h3 onClick={
                    () => props.toggleView
                        ? props.setToggleView(false) // show chats
                        : props.setToggleView(true)} // show search
                >
                    {!props.toggleView
                        ? <HiOutlineSearch className="search-icon" />
                        : <MdOutlineClose className="search-icon" />}</h3>
            </div>
            {props.toggleView && <Search />}
        </div>
    )
}

export default SideTopbar
