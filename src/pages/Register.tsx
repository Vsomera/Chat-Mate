import { FaRegUser } from "react-icons/fa"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()

    const registerEmailPassword = async () => {
        try {
            // registers a user into firebase with email and password
            const newUser = await createUserWithEmailAndPassword(auth, email, password)

            // set display name to the username
            await updateProfile(newUser.user, {
                displayName: username
            })

            toast.success(`Welcome ${username}`)
            navigate("/")

        } catch (err) {
            const errorMessage = (err as Error).message
            toast.error(`${errorMessage}`)
        }
        console.log(auth.currentUser)
        // empties text box
        setEmail("")
        setPassword("")
    }


    const onSubmit = async () => {
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match")
        } 
        registerEmailPassword()
    }

    // remove br tag
    return (
        <>
            <div className="auth-background">
                <div className="auth-container">

                    <section className="register-content">
                        <h1>Create an Account</h1>
                            <div>
                                <p>We'll need your name, email address, and a unique password. </p>
                                <p>You'll use this login to access ChatMate next time. </p>
                            </div>
                    </section>

                    <hr/>

                    <section className="register-form">
                        <div>
                            <h1><FaRegUser className="icon" /> Register</h1>
                        </div>

                        <form className="register-group" autoComplete="off">
                            <input
                                id="name"
                                className="input"
                                type="name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Please enter a Username" />
                            <div className="underline"></div>
                            <input
                                id="email"
                                className="input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Please enter your Email" />
                            <div className="underline"></div>
                            <input
                                id="password"
                                className="input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter a Password" />
                            <div className="underline"></div>

                            <input
                                id="password"
                                className="input"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password" />
                            <div className="underline"></div>
                        </form>
                        <button type="submit" onClick={onSubmit}>Sign In</button>
                    </section>

                </div>
            </div>
        </>
    )
}

export default Register