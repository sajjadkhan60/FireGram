import React, { useState } from "react";
import CustomInput from "../../components/custom_input/custom_input.component";
import "./signup.css";
import CustomButton from "../../components/custom_button/custom_button.component";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  fname: "",
  email: "",
  password: "",
  cpassword: "",
};

function SignupPage({ setRegisterd }) {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(false);
  const [auth, setAuth] = useState(false);
  const [emptyError, setemptyError] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const { fname, email, password, cpassword } = state;
  let navigate = useNavigate();
  setRegisterd(false);
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const addUser = (e) => {
    e.preventDefault();
    setError(false);
    setemptyError(false);
    setIncorrectPassword(false);
    setAuth(false);
    if (fname == "" || email == "" || password == "" || cpassword == "") {
      setemptyError(true);
    } else if (password != cpassword) {
      setIncorrectPassword(true);
    } else {
      setAuth(true);
      setTimeout(() => {
        fetch("https://sajjad-ahmad.com/projects/firegram/user_add.php", {
          method: "POST",
          body: JSON.stringify(state),
          headers: {
            "Content-type": "application/json;",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.insert == "exists") {
              setAuth(false);
              setError(true);
            } else if (data.insert == "success") {
              setRegisterd(state.fname);
              navigate(`/`);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, 1000);
    }
  };
  return (
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
        <h3>SignUp</h3>
        {error && (
          <div className="error">
            An account with this email already exists. Please use a different
            email.
          </div>
        )}

        {incorrectPassword && (
          <div className="error">
            Please make sure both the passwords are equal.
          </div>
        )}

        {emptyError && (
          <div className="error">
            Please make sure all the fields are filled.
          </div>
        )}
        <form onSubmit={addUser}>
          <CustomInput
            title={"Name"}
            type={"text"}
            name={"fname"}
            value={fname}
            onChange={handleChange}
          />
          <CustomInput
            title={"Email"}
            type={"email"}
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
          <CustomInput
            title={"Confirm Password"}
            type={"password"}
            name={"cpassword"}
            value={cpassword}
            onChange={handleChange}
          />
          {auth ? (
            <CustomButton name={"Please wait ..."} className={"disabled"} />
          ) : (
            <CustomButton
              name={"Sign Up"}
              onClick={addUser}
              className={"custom_button"}
            />
          )}
        </form>
        <div className="signuplink">
          Already a member?
          <span>
            <Link to="/"> Login Here!</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
