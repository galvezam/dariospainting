import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { Box, HStack, Link, Icon } from "@chakra-ui/react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setIsVisible(prevScrollPos > currentScrollPos);
        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [prevScrollPos]);



    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            navigate('/');
        }
    };

    return (
        <Box
        position="fixed"
  
        top={isVisible ? 0 : -120}
        left={0}
        right={0}
        translateY={0}
        transitionProperty="top"
        transitionDuration=".3s"
        transitionTimingFunction="ease-in-out"
        backgroundColor="#18181b"
        zIndex={1000} // Ensure the header stays on top
        
        
      >
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/">Dario's Painting</NavLink>
            </div>
            <div className="navbar-hamburger">
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    &#9776;
                </button>
            </div>
            <div className={`overlay ${!menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(menuOpen)}></div>
            <ul className={`navbar-ul ${menuOpen ? "open" : ""}`}>
                <li><NavLink to="/" activeClassName="active" onClick={() => setMenuOpen(!menuOpen)}>Home</NavLink></li>
                <li><NavLink to="/projects" activeClassName="active" onClick={() => setMenuOpen(!menuOpen)}>Projects</NavLink></li>
                <li><NavLink to="/estimates" activeClassName="active" onClick={() => setMenuOpen(!menuOpen)}>Estimates</NavLink></li>
                <li><NavLink to="/find-booking" activeClassName="active" onClick={() => setMenuOpen(!menuOpen)}>Find My Booking</NavLink></li>

                {isUser && <li><NavLink to="/profile" activeClassName="active" onClick={() => setMenuOpen(!menuOpen)}>Profile</NavLink></li>}
                {isAdmin && <li><NavLink to="/admin" activeClassName="active" onClick={() => setMenuOpen(!menuOpen)}>Admin</NavLink></li>}

                {!isAuthenticated && <li><NavLink to="/login" activeClassName="active" onClick={() => setMenuOpen(!menuOpen)}>Login</NavLink></li>}
                {!isAuthenticated && <li><NavLink to="/register" activeClassName="active" onClick={() => setMenuOpen(!menuOpen)}>Register</NavLink></li>}
                {isAuthenticated && <li onClick={() => { handleLogout(); setMenuOpen(!menuOpen)}}>Logout</li>}
            </ul>
        </nav>
        </Box>
    );
};

export default Navbar;