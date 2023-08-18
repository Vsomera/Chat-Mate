import { useState } from "react"
import SideTopbar from "./SideTopbar"
import Chats from "./Chats"

interface Props {
    setSidebarModal: (arg: boolean) => void
}

const SidebarModal = (props: Props) => {

    const [toggleView, setToggleView] = useState(false) // toggles the search and chats view

    const handleContainerClick = (e :  React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            props.setSidebarModal(false)
        }
    }

    return (
        <div className="modal" onClick={handleContainerClick}>
            <div className="modal-container">
                <SideTopbar
                    toggleView={toggleView}
                    setToggleView={setToggleView} />
                <Chats
                    toggleView={toggleView}
                    setToggleView={setToggleView} />
            </div>
        </div>
    )
}

export default SidebarModal