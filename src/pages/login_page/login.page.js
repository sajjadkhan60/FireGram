import React, { useState } from "react";
import CustomInput from "../../components/custom_input/custom_input.component";
import "./login.page.css";
import CustomButton from "../../components/custom_button/custom_button.component";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function LoginPage({ registerd, setRegisterd }) {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(false);
  const [auth, setAuth] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [emptyError, setemptyError] = useState(false);

  const { email, password } = state;
  let navigate = useNavigate();
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const authUser = async (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      setemptyError(true);
      setRegisterd(false);
    } else {
      setemptyError(false);
      setRegisterd(false);
      setAuth(true);
      setError(false);

      setTimeout(() => {
        fetch("https://sajjad-ahmad.com/projects/firegram/user_auth.php", {
          method: "POST",
          body: JSON.stringify(state),
          headers: {
            "Content-type": "application/json;",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.authentications == "login_failed") {
              setError(true);
              setAuth(false);
              console.log("User not found!!!");
            } else if (data.authentications == "login_success") {
              setLoginStatus(true);
              console.log("User found!!!");
              setAuth(false);
              window.localStorage.setItem("userEmail", state.email);
              setTimeout(() => {
                navigate(`/dashboard`);
              }, 2000);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, 1000);

      // const check = await auth_User(JSON.stringify(state));
      // if (!check) {
      //   setError(true);
      //   setAuth(false);
      //   console.log("User not found!!!");
      // } else {
      //   setLoginStatus(true);
      //   console.log("User found!!!");
      //   setAuth(false);
      //   window.localStorage.setItem("userEmail", state.email);
      //   setTimeout(() => {
      //     navigate(`/dashboard`);
      //   }, 2000);
      // }
    }
  };
  console.log(registerd);
  return (
    <div>
      <div className="login_page">
        <div className="login_form_container">
          <div className="logo">
            <h1
              style={{
                marginTop: "0px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              FireGram
            </h1>
          </div>
          <h3>Login</h3>
          {error && (
            <div className="error">Email or password is incorrect.</div>
          )}
          {registerd && (
            <div className="registerationsuccess">
              You are successfully registered, {registerd}
            </div>
          )}
          {loginStatus && (
            <div className="registerationsuccess">
              Login Success <br />
              Redirecting you to dashboard ...
            </div>
          )}
          {emptyError && (
            <div className="error">
              Please make sure all the fields are filled.
            </div>
          )}
          <form onSubmit={authUser}>
            <CustomInput
              title={"Email"}
              type={"text"}
              name={"email"}
              value={email}
              onChange={handleChange}
            />
            <CustomInput
              title={"Password"}
              type={"password"}
              name={"password"}
              value={password}
              onChange={handleChange}
            />
            {auth ? (
              <CustomButton name={"Please wait ..."} className={"disabled"} />
            ) : (
              <CustomButton
                name={"Login"}
                className={"custom_button"}
                onClick={authUser}
              />
            )}
          </form>
          <div className="signuplink">
            Not a member?{" "}
            <span>
              <Link to="/signup">Signup now</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
