import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import Details from "././components/Details";
import Author from "./Pages/Author";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";


{/* 
import ContactUs from "./Pages/ContactUs";

import Author from "./Pages/Author"; */}



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:slug" element={<Details />} />
        <Route path="/author/:username" element={<Author />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/login" element={<Login />} />
        
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        {/*}<Route path="/contact" element={<ContactUs />} />
        
        
        <Route path="/author/:username" element={<Author />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;