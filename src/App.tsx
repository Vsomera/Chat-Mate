import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "./context/userContext";
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from "./pages/ChatPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import './App.css'

function App() {

  interface ProtectedRouteProps {
    children: React.ReactNode
  }

  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useContext(UserContext)

    if (!user) {
      // If a user is not logged in, redirect to the login page
      return <Navigate to="/login" />
    }

    return <>{children}</>
  }

  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
