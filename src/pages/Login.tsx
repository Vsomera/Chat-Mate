import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { auth } from "../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import AuthMethods from "../components/AuthMethods";



const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
         if (user !== null) {
             navigate("/")
         }
        })
 
     }, [navigate])

    const onSubmit = async () => {
        try {
            if (email.trim().length == 0) {
                return toast.error("Error: Missing Login Fields")
            } else {
                // Logs in a user
                const userLogin = await signInWithEmailAndPassword(auth, email, password)
                toast.success(`Welcome Back ${userLogin.user.displayName}!`)

                // redirect to chats page
                navigate("/")
            }
        } catch (err) {
            const errorMessage = (err as Error).message
            toast.error(`${errorMessage}`)
        }
    }


    return (
        <>
            <div className="background">
                <div className="auth-container">

                    <section className="login-content">
                        <h1>Welcome Back!</h1>
                        <div>
                            <p>Easily stay connected, and have meaningful conversations.  </p>
                            <p>ChatMate provides a secure and user-friendly platform for seamless communication.</p>
                        </div>

                        <div className="auth-divider"><p>or log in with</p></div>

                        <AuthMethods />

                    </section>

                    <hr />

                    <section className="login-form">

                        <div>
                            <h1><FaSignInAlt className="icon" />  Login</h1>
                        </div>

                        <form className="login-group" autoComplete="off">
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
                                placeholder="Enter Password" />
                            <div className="underline"></div>

                        </form>

                        <button type="submit" onClick={onSubmit}>Log In</button>

                    </section>

                </div>
            </div>
        </>
    )
}

export default Login