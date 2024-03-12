/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { emit } from "@create-figma-plugin/utilities";
import { useState } from "preact/hooks";
import { TidyLogo } from "../images/TidyLogo";
import { IconMail, IconEye } from "@tabler/icons-react";
import { login } from "./ui_functions/authentication";
import { validateEmail } from "./ui_functions/validateEmail";
// import { getDocumentation } from "../auxiliaryFunctions/documentationHandlers";

const Login = ({
  setToken,
  setIsLoginFailed,
  isLoginFailed,
  setIsLoginPageOpen,
  setIsSettingPageOpen,
  setIsSigninPageOpen,
  setShowPasswordResetPopup,
  setShowWaitingInfoPopup,
  setUserRank,
}: {
  setToken: (value: string) => void;
  setIsLoginFailed: (value: boolean) => void;
  isLoginFailed: boolean;
  setIsLoginPageOpen: (value: boolean) => void;
  setIsSettingPageOpen: (value: boolean) => void;
  setIsSigninPageOpen: (value: boolean) => void;
  setShowPasswordResetPopup: (value: boolean) => void;
  setShowWaitingInfoPopup: (value: boolean) => void;
  setUserRank: (value: string) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleEmailChange = (e: any) => {
    setIsLoginFailed(false);
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setIsLoginFailed(false);
    setPassword(e.target.value);
  };

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
      console.log("response", response);
      if (token) {
        const rank = response.rank;
        emit("SAVE_NEW_TOKEN_AND_EMAIL", token, email, rank);
        setToken(token);
        setUserRank(rank);
        setIsLoginPageOpen(false);
        setIsSettingPageOpen(false);
      } else if (response.message === "User exists but not active") {
        // setIsLoginFailed(true);
        setShowWaitingInfoPopup(true);
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
      <div className={isLoginFailed ? "inputDiv inputDiv-invalid" : "inputDiv"}>
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
      <div className={isLoginFailed ? "inputDiv inputDiv-invalid" : "inputDiv"}>
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
          href={"#"}
          onClick={() => {
            setIsLoginPageOpen(false);
            setIsSigninPageOpen(true);
          }}
        >
          here
        </a>
        .
      </p>
      <p style="margin-top: -1.25em;">
        Forgot your password? Click{" "}
        <a
          href={"#"}
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
