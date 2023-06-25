import { useState } from "react"
import { collection, doc, setDoc } from "firebase/firestore"; 


const Search = () => {

    // create a state with all the user's
    const [searchedUser, setSearchedUser] = useState("")

    return (
        <div className="search">
            
            <input 
                type="text" 
                className="auth-input"
                value={searchedUser}
                onChange={e => setSearchedUser(e.target.value)}
                placeholder="Search for User..."/>
            <div className="underline"></div>

            <div className="searched-user">
                <img 
                    src=""
                    alt="" />
            </div>
        </div>
    )
}

export default Search
