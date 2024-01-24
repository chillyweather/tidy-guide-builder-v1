import { h } from "preact";
import { emit } from "@create-figma-plugin/utilities";
import { useState, useContext } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { TidyLogo } from "../images/TidyLogo";
import { IconMail, IconEye } from "@tabler/icons-react";
import { login } from "./ui_functions/authentication";
// import { getDocumentation } from "../auxiliaryFunctions/documentationHandlers";

const Login = ({
  setToken,
  setIsLoginFailed,
  isLoginFailed,
  setIsLoginPageOpen,
  setIsLoading,
  setIsSigninPageOpen,
  setShowPasswordResetPopup,
}: {
  setToken: Function;
  setIsLoginFailed: Function;
  isLoginFailed: boolean;
  setIsLoginPageOpen: Function;
  setIsLoading: Function;
  setIsSigninPageOpen: Function;
  setShowPasswordResetPopup: Function;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const emailIsValid = validateEmail(email);
    setIsEmailValid(emailIsValid);

    const passwordIsValid = password.length >= 5;
    setIsPasswordValid(passwordIsValid);

    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    try {
      const response = await login(email, password);
      const token = response.token;
      if (token) {
        emit("SAVE_NEW_TOKEN", token);
        emit("SAVE_USER_EMAIL", email);
        setToken(token);
        setIsLoginPageOpen(false);
      }
    } catch (error) {
      console.log("Login failed:", error);
      setIsLoginFailed(true);
    }
  };

  const invalidEmailClass = !isEmailValid ? "notFilled" : "";
  const invalidPasswordClass = !isPasswordValid ? "notFilled" : "";

  return (
    <form onSubmit={handleSubmit} className="section login">
      <div className="navigation"></div>
      <TidyLogo />
      <p>
        {isLoginFailed
          ? "Wrong email or password, please, try again"
          : "Please enter your credentials"}
      </p>
      <div className="inputDiv">
        <input
          type="text"
          placeholder="Email"
          id="inputMail"
          required
          spellcheck={false}
          value={email}
          onChange={handleEmailChange}
          className={invalidEmailClass}
        />
        <IconMail
          size={24}
          stroke={2}
          className="icon icon-tabler icon-tabler-mail"
        />
        <div className="invalidText">Invalid email address</div>
      </div>
      <div className="inputDiv">
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          id="inputPass"
          required
          value={password}
          onChange={handlePasswordChange}
          className={invalidPasswordClass}
        />
        <IconEye
          size={24}
          stroke={2}
          className="icon icon-tabler icon-tabler-eye"
          onClick={() => setPasswordVisible(!passwordVisible)}
        />
        <div className="invalidText">
          Password should be at least 5 symbols long
        </div>
      </div>
      <button type="submit">Login</button>
      <p>
        Don't have an account? Create one{" "}
        <a
          onClick={() => {
            setIsLoginPageOpen(false);
            setIsSigninPageOpen(true);
          }}
        >
          here
        </a>
        .
      </p>
      <p>
        Forgot your password? Click{" "}
        <a
          onClick={() => {
            setShowPasswordResetPopup(true);
          }}
        >
          here
        </a>
        .
      </p>
    </form>
  );
};

export default Login;
