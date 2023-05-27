import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            {/* <Route path="/" element={ } /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
