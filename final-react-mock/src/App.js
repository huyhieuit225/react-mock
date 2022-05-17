import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./components/Page/HomePage";
import PostsAPI from "./components/API/Posts";
import Login from "./components/Page/LoginPage";
import Register from "./components/Page/RegisterPage";
import ErrorPage from "./components/Page/ErrorPage";
import PostDetail from "./components/API/PostDetail";
import ProfilePage from "./components/Page/ProfilePage";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import UserContext from "./components/Context/UserContext";
import { Nav, Navbar } from "react-bootstrap";
import logo from "./components/images/react.png";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("TOKEN") || null);
  const [userId, setUserId] = useState(localStorage.getItem("USERID") || null);
  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    fontSize: "20px",
    color: "grey",
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("USERID", userId);
    } else {
      localStorage.removeItem("USERID");
    }
  }, [userId]);

  const sharedAuthenticationTool = {
    token,
    setToken,
    userId,
    setUserId,
  };

  return (
    <div className="container-fluid main">
      <BrowserRouter>
        <UserContext.Provider value={sharedAuthenticationTool}>
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav>
                <NavLink style={linkStyle} to="/home">
                  <img src={logo} alt="logo" className="logo"></img>
                </NavLink>
                <NavLink style={linkStyle} to="/home">
                  Home
                </NavLink>
                <NavLink style={linkStyle} to="/postsAPI">
                  Posts
                </NavLink>
                <NavLink style={linkStyle} to="/profile">
                  Profile
                </NavLink>
                <NavLink style={linkStyle} to="/register">
                  Register
                </NavLink>
                {token === null ? (
                  <NavLink style={linkStyle} to="/login">
                    Login
                  </NavLink>
                ) : (
                  <button
                    onClick={() => {
                      setToken(null);
                      setUserId(null);
                    }}
                  >
                    Logout
                  </button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/postsAPI" element={<PostsAPI />} />
            <Route path="/postsAPI/:id" element={<PostDetail />} />
            <Route path="/postsAPI/detail/:id" element={<PostDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
