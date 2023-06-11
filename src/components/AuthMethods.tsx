import { FcGoogle } from "react-icons/fc"
import { VscGithub } from "react-icons/vsc"
import { CgMicrosoft } from "react-icons/cg"
import { signInGoogle, signInGithub, signInMS } from "../auth/authService"

const AuthMethods = () => {
    return (
        <div className="auth-methods">
            <div className="icon-wrapper" onClick={signInGoogle}>
                <div className="icon-container-google">
                    <FcGoogle className="auth-icon" />
                </div>
            </div>
            <div className="icon-wrapper" onClick={signInGithub}>
                <div className="icon-container-github">
                    <VscGithub className="auth-icon" />
                </div>
            </div>
            <div className="icon-wrapper" onClick={signInMS}>
                <div className="icon-container-microsoft">
                    <CgMicrosoft className="auth-icon" />
                </div>
            </div>
        </div>
    )
}

export default AuthMethods
