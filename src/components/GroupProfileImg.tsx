import { User } from "firebase/auth"


interface Props {
    chatUsers : User[]
}

const GroupProfileImg = (props : Props) => {
    return (
        <>
                {
                    // loop through users array
                    props.chatUsers.map((user) => {
                        return (
                            <img 
                                className="group-img"
                                src={user.photoURL || ""} 
                                alt="" />
                        )
                    })
                }
        </>
    )
}

export default GroupProfileImg
