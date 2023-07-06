import { useState } from "react"
import SideTopbar from "./SideTopbar"
import Chats from "./Chats"

const Sidebar = () => {
    // false : show the chats component
    // true : show the search search
    const [toggleView, setToggleView] = useState(false) // toggles the search and chats view

    return (
        <aside>
            <SideTopbar
                toggleView={toggleView}
                setToggleView={setToggleView} />
            <Chats
                toggleView={toggleView}
                setToggleView={setToggleView} />
        </aside>
    )
}

export default Sidebar
