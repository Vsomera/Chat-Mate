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
                                key={user.uid}
                                className="group-img"
                                src={user.photoURL || ""} 
                                referrerPolicy="no-referrer"
                                alt="" />
                        )
                    })
                }
        </>
    )
}

export default GroupProfileImg
