import { FaRegUser } from "react-icons/fa"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()

    const registerEmailPassword = async () => {
        try {
            // registers a user into firebase with email and password
            await createUserWithEmailAndPassword(auth, email, password)
            
            toast.success(`Welcome ${name}`)
            navigate("/")
            
        } catch (err) { // TODO fix
            const errorMessage = (err as Error).message
            toast.error(`${errorMessage}`)
        }
        console.log(auth.currentUser)
        // empties text box
        setEmail("")
        setPassword("")
    }

    return (
        <>
            <div className="auth-background">
                <div className="auth-container">

                    <section className="register-content">
                        <h1>Create an Account</h1>
                        <br />
                        <p>We'll need your name, email address, and a unique password. </p>
                        <p>You'll use this login to access ChatMate next time. </p>
                    </section>

                    <hr></hr>

                    <section className="register-form">
                        <div>
                            <h1><FaRegUser className="icon" /> Register</h1>
                        </div>

                        <form className="register-group">
                            <input
                                id="name"
                                className="input"
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                        <button onClick={registerEmailPassword}>Sign In</button>
                    </section>

                </div>
            </div>
        </>
    )
}

export default Register