import { FaRegUser } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { VscGithub } from "react-icons/vsc"
import { CgMicrosoft } from "react-icons/cg"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { auth } from "../config/firebase"
import { registerEmailPassword } from "../auth/authService";

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        // Checks if a user is logged in
        auth.onAuthStateChanged((user) => {
          if (user !== null) {
            navigate("/");
          }
        })

      }, [navigate])

    function checkStrongPassword(password: string) {
        // Verifies password strength
        const requirements = [
            { regex: /[a-z]/, message: "Password should contain at least one lowercase letter" },
            { regex: /[A-Z]/, message: "Password should contain at least one uppercase letter" },
            { regex: /[0-9]/, message: "Password should contain at least one digit" },
            { regex: /[!@#$%^&*]/, message: "Password should contain at least one special character (!@#$%^&*)" }
        ];

        for (const requirement of requirements) {
            if (!requirement.regex.test(password)) {
                return toast.error(requirement.message);
            }
        }
        if (password.length < 8) {
            return toast.error("Password should be at least 8 characters long");
        }
        // returns password if password requirements are met
        return password;
    }


    const onSubmit = async () => {
        if (username.trim().length == 0) {
            return toast.error("Error: Missing Registration Fields")
        } else {
            if (password.trim().length == 0) {
                return toast.error("Please enter a password")
            }
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match")
        }

        if (checkStrongPassword(password) === password) {
            await registerEmailPassword(username, email, password)
        }
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

                        <div className="auth-divider"><p>or sign in with</p></div>

                        <div className="auth-methods">
                            <div className="icon-wrapper">
                                <div className="icon-container-google">
                                    <FcGoogle className="auth-icon" />
                                </div>
                            </div>
                            <div className="icon-wrapper">
                                <div className="icon-container-github">
                                    <VscGithub className="auth-icon" />
                                </div>
                            </div>
                            <div className="icon-wrapper">
                                <div className="icon-container-microsoft">
                                    <CgMicrosoft className="auth-icon" />
                                </div>
                            </div>
                        </div>

                    </section>

                    <hr />

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
                                id="confirm-password"
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