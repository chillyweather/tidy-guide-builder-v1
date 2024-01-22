import { h } from "preact";
import { emit } from "@create-figma-plugin/utilities";
import { useState, useContext, useEffect } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { TidyLogo } from "../images/TidyLogo";
import { IconMail, IconEye, IconUsersGroup } from "@tabler/icons-react";
import { login } from "./ui_functions/authentication";
// import { getDocumentation } from "../auxiliaryFunctions/documentationHandlers";

const SignIn = ({
  setToken,
  setIsLoginFailed,
  isLoginFailed,
  setIsLoginPageOpen,
  setIsLoading,
  setIsSigninPageOpen,
}: {
  setToken: Function;
  setIsLoginFailed: Function;
  isLoginFailed: boolean;
  setIsLoginPageOpen: Function;
  setIsLoading: Function;
  setIsSigninPageOpen: Function;
}) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isRepeatedPasswordValid, setIsRepeatedPasswordValid] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatedPasswordVisible, setRepeatedPasswordVisible] = useState(false);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [doRegister, setDoRegister] = useState(false);

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleEmailChange = (e: any) => {
    setIsEmailValid(true);
    setEmail(e.target.value);
  };
  const handleCompanyNameChange = (e: any) => setCompanyName(e.target.value);
  const handlePasswordChange = (e: any) => {
    setIsPasswordValid(true);
    setIsPasswordsMatch(true);
    setPassword(e.target.value);
  };
  const handleRepeatedPasswordChange = (e: any) => {
    setIsRepeatedPasswordValid;
    setIsPasswordsMatch(true);
    setRepeatedPassword(e.target.value);
  };

  const invalidEmailClass =
    email.length > 0 && !validateEmail(email) ? "notFilled" : "";
  const invalidPasswordClass =
    password.length > 0 && password.length < 5 ? "notFilled" : "";
  const invalidRepeatPasswordClass =
    repeatedPassword.length > 0 && repeatedPassword.length < 5
      ? "notFilled"
      : "";

  const checkFields = () => {
    if (email.length > 0 && !validateEmail(email)) {
      setIsEmailValid(false);
    }
    if (password.length > 0 && password.length < 5) {
      setIsPasswordValid(false);
    }
    if (repeatedPassword.length > 0 && repeatedPassword.length < 5) {
      setIsRepeatedPasswordValid(false);
    }
    if (password !== repeatedPassword) {
      setIsPasswordsMatch(false);
    }
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    checkFields();
    setDoRegister(true);
    // const isPasswordsMatch = password === repeatedPassword;
    // if (!isPasswordsMatch) {
    //   setIsPasswordsMatch(false);
    //   return;
    // }
    // console.log("passwords match");
    // try {
    //   const response = await login(email, password);
    //   const token = response.token;
    //   if (token) {
    //     emit("SAVE_NEW_TOKEN", token);
    //     emit("SAVE_USER_EMAIL", email);
    //     setToken(token);
    //     setIsLoginPageOpen(false);
    //   }
    // } catch (error) {
    //   console.log("Login failed:", error);
    //   setIsLoginFailed(true);
    // }
  };

  useEffect(() => {
    if (
      isEmailValid &&
      isPasswordValid &&
      isRepeatedPasswordValid &&
      isPasswordsMatch
    ) {
      setAllFieldsValid(true);
    } else {
      setDoRegister(false);
    }
  }, [doRegister]);

  useEffect(() => {
    console.log("doRegister", doRegister);
    console.log("allFieldsValid", allFieldsValid);
  }, [allFieldsValid, doRegister]);

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
        {!isEmailValid && (
          <div className="invalid-text">Invalid email address</div>
        )}
      </div>
      <div className="inputDiv">
        <input
          type="text"
          placeholder="Company name"
          id="inputCompany"
          required
          spellcheck={false}
          value={companyName}
          onChange={handleCompanyNameChange}
        />
        <IconUsersGroup
          size={24}
          stroke={2}
          className="icon icon-tabler icon-tabler-usergroup"
        />
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
        {!isPasswordValid && (
          <div className="invalid-text">
            Password should be at least 5 symbols long
          </div>
        )}
        {!isPasswordsMatch && isPasswordValid && (
          <div className="invalid-text">Password don't match</div>
        )}
      </div>
      <div className="inputDiv">
        <input
          type={repeatedPasswordVisible ? "text" : "password"}
          placeholder="Repeat password"
          id="inputRepeatPass"
          required
          value={repeatedPassword}
          onChange={handleRepeatedPasswordChange}
          className={invalidRepeatPasswordClass}
        />
        <IconEye
          size={24}
          stroke={2}
          className="icon icon-tabler icon-tabler-eye"
          onClick={() => setRepeatedPasswordVisible(!repeatedPasswordVisible)}
        />

        {!isPasswordValid && (
          <div className="invalid-text">
            Password should be at least 5 symbols long
          </div>
        )}
        {!isPasswordsMatch && isPasswordValid && (
          <div className="invalid-text">Password don't match</div>
        )}
      </div>
      <button type="submit">Sigh in</button>
      <p>
        Already have an account? You can log in{" "}
        <a
          onClick={() => {
            setIsSigninPageOpen(false);
            setIsLoginPageOpen(true);
          }}
        >
          here
        </a>
        .
      </p>
    </form>
  );
};

export default SignIn;
