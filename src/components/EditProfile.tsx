import { UserContext } from "../context/userContext"
import { RiSettings4Line } from "react-icons/ri"
import { useContext } from "react"

const EditProfile = () => {

    const { user } = useContext(UserContext)


    return (
        <div className="edit-profile">
            <div className="profile-content">
                <div className="user-info">
                    <img src={user?.photoURL || ""} alt="" />
                    <div>
                        <h5>{user?.displayName}</h5>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <RiSettings4Line 
                    className="settings-icon" 
                    onClick={() => console.log("clicked")}/>
            </div>
        </div>
    )
}

export default EditProfile