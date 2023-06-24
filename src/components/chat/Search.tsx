import { useState } from "react"

const Search = () => {

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

        </div>
    )
}

export default Search
