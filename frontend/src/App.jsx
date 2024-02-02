import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Send } from "./pages/Send";
import "./index.css"


function App() {

 
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/Dashboard" /> : <Navigate to="/Signup" />
}/>
            <Route path="/Dashboard" element={<Dashboard />}/>
            <Route path="/Signup" element={<Signup />}/>
            <Route path="/Signin" element={<Signin />}/>
            <Route path="/Send" element={<Send />}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
