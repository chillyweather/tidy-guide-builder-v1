import { h } from "preact";
import { emit } from "@create-figma-plugin/utilities";
import { TidyLogo } from "../images/TidyLogo";

const LoggedIn = ({ setToken }: { setToken: any }) => {
  return (
    <div className="section login">
      <div className="navigation"></div>
      <TidyLogo />
      <h2>You're logged in.</h2>
      <div className={"loginFlex"}>
        <button
          onClick={() => {
            setToken("");
            emit("LOGOUT");
          }}
        >
          Log out
        </button>
      </div>
      <footer>
        By signing in you accept our <br />
        <a>Privacy policy</a> and <a>Terms of service</a>
      </footer>
    </div>
  );
};

export default LoggedIn;
