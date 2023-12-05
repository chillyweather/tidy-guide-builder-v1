import { h } from "preact";
import { emit } from "@create-figma-plugin/utilities";
import { useState } from "preact/hooks";
import { TidyLogo } from "../images/TidyLogo";
import { IconMail, IconEye } from "@tabler/icons-react";
import { login } from "../ui_functions/authentication";
// import { getDocumentation } from "../auxiliaryFunctions/documentationHandlers";

const Login = ({
  path,
  setToken,
  setIsLoginFailed,
  isLoginFailed,
  setIsLoginPageOpen,
}: {
  path?: string;
  setToken: Function;
  setIsLoginFailed: Function;
  isLoginFailed: boolean;
  setIsLoginPageOpen: Function;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const invalidEmailClass =
    email.length > 0 && !validateEmail(email) ? "notFilled" : "";
  const invalidPasswordClass =
    password.length > 0 && password.length < 5 ? "notFilled" : "";

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      const token = response.token;
      if (token) {
        emit("SAVE_NEW_TOKEN", token);
        setToken(token);
        setIsLoginPageOpen(false);
        // const data = await getDocumentation(token);
        // if (data) {
        //   setDocData(data);
        // }
        // setIsLoginFailed(false);
        // setIsLoading(false);
        // setIndexOpen(true);
      }
    } catch (error) {
      console.log("Login failed:", error);
      setIsLoginFailed(true);
    }
  };

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
          spellCheck={false}
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
        Don't have an account? Request one <a>here</a>.
      </p>
    </form>
  );
};

export default Login;
