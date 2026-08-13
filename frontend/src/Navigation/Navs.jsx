import { isAuthenticated } from "../utils/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";

export default function Navs() {
  const [isOpen, setIsOpen] = useState(false);
  const [cateOpen, setCateOpen] = useState(false);
  const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  window.location.href = "/";
};

  return (
    <>
      <div>
        <button
          className="menu-btn"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

        <div className={`sidebar ${isOpen ? "show" : "close"}`}>
          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <ul>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/About">About</Link> </li>
            <li> <Link to="/Contact">Contact Us</Link></li>
            <li> <Link to="/Contact">Categories</Link></li>
            <li> <Link to="/Contact">Contact Us</Link></li>
            <li> <Link to="/Bookmark"> Bookmark </Link></li>
            
            <li>
  {isAuthenticated() ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <Link to="/login">
      <button>Login</button>
    </Link>
  )}
</li>
            
            
            {/* 
            <li>
              <Link to="/">Home</Link>
            </li>
            
            <li>
              
              <a onClick={() => setCateOpen(!cateOpen)}>Categories</a>
              
              {cateOpen && (<div className="gap-2 grid p-6"> 
                <a href="/page">Markeing</a>
                <a>Markeing</a>
              </div> )}
              
            </li>
            
            <li><Link to="/Bookmark"> Bookmarks </Link></li> */}
            </ul>
        </div>
      </div>
    </>
  );
}