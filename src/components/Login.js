import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [username, resetUsername, usernameAttribs] = useInput("username", ""); //useState("");
  //const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  //const [email, setEmail] = useState("");
  
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    userRef.current.focus();
  }, []);


  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username,  password}),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO Delete logs in production
     
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ username, roles, password, accessToken });
      console.log(username, roles, password, accessToken);
      resetUsername();
      //setUser("");
      setPwd("");
      //setEmail("");
      
      
      navigate(from, { replace: true });



    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  /*   const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]); */

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
/*           onChange={(e) => setUser(e.target.value)}
          value={username} */
          {...usernameAttribs}
          required
        />
{/*         <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        /> */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={password}
          required
        />
        <button>Sign In</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={toggleCheck}
            checked={check}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
