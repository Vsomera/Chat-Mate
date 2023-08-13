import { UserContext } from "../context/userContext"
import { RiSettings4Line } from "react-icons/ri"
import { useState, useContext } from "react"
import Modal from "../components/ProfileModal"

const EditProfile = () => {

    const { user } = useContext(UserContext)
    const [modalIsOpen, setIsOpen] = useState(false)

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
                    onClick={() => modalIsOpen ? setIsOpen(false) : setIsOpen(true)}/>
            </div>
            {modalIsOpen 
                && <Modal 
                    modalIsOpen={modalIsOpen}
                    setIsOpen={setIsOpen} 
                    />}
        </div>
    )
}

export default EditProfile