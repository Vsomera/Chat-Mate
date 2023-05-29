import { FaRegUser } from "react-icons/fa"
import { useState } from "react"
import tst from "../images/trees.svg"


const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

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

                        <form className="register-group" onSubmit={undefined}>
                            <input
                                className="input"
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Please enter a Username" />
                            <div className="underline"></div>
                            <input
                                className="input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Please enter your Email" />
                            <div className="underline"></div>
                            <input
                                className="input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter a Password" />
                            <div className="underline"></div>

                            <input
                                className="input"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password" />
                            <div className="underline"></div>
                        </form>
                        <button >Sign In</button>
                    </section>

                </div>
            </div>
        </>
    )
}

export default Register