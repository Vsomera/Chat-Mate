import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import { auth } from "./config/firebase";
import { User } from "firebase/auth";
import { UserContext } from "./context/userContext";
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from "./pages/ChatPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import './App.css'

function App() {

  const [user, setUser] = useState<User | null>(null)
  auth.onAuthStateChanged((user) => {
    if (user != null) {
      setUser(user)
    } else {
      setUser(null)
    }
  })

  return (
    <>
      <UserContext.Provider value={{ user }}>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App
