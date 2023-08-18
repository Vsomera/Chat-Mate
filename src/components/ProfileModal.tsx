import { useState, useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { RiImageEditFill } from "react-icons/ri"
import { editProfile } from "../services/authService"
import ReactLoading from "react-loading"

interface Props {
    modalIsOpen: boolean
    setIsOpen: (arg: boolean) => void
}

const ProfileModal = (props: Props) => {

    const { user } = useContext(UserContext)

    const [newPfp, changePfp] = useState<File | null>(null)
    const [imgURL, setURL] = useState<string | null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)

    const handleSave = async () => {
        if (newPfp) {
            setLoading(true)
            await editProfile(newPfp)
        }
    }

    useEffect(() => {
        if (newPfp) {
            setURL(URL.createObjectURL(newPfp))
        }
    }, [newPfp])

    const handleContainerClick = (e :  React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            props.setIsOpen(false)
        }
    }

    return (
        <>
            {props.modalIsOpen &&
                <div className="modal" onClick={handleContainerClick}>
                    <div className="modal-container">
                        <div className="modal-wrapper">

                            <div className="edit-pf-divider"><p>Edit Profile</p></div>
                            {isLoading
                                ? <div className="modal-loading">
                                    <p>Changing Profile Picture
                                        <ReactLoading className="modal-load" type="bubbles" /></p>
                                </div>
                                : <>
                                    <div className="modal-user">
                                        <img
                                            src={imgURL
                                                ? imgURL
                                                : user?.photoURL || ""}
                                            className="modal-pfp" />
                                        <div>
                                            <p>{user?.displayName}</p>
                                            <p>{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="edit-options">
                                        <div className="change-pfp-container">
                                            <input
                                                id="file"
                                                type="file"
                                                style={{ display: "none" }}
                                                accept="image/*"
                                                onChange={(e) => changePfp(e.target.files?.[0] || null)} />
                                            <label
                                                htmlFor="file"
                                                style={{ display: "flex" }}>
                                                <RiImageEditFill className="addImage-icon" />
                                                <p>Change Profile Picture</p>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="modal-btns">
                                        { imgURL && <button onClick={() => handleSave()}>
                                            Save
                                        </button>}
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ProfileModal