import { h } from "preact";
import { emit } from "@create-figma-plugin/utilities";
import { TidyLogo } from "../images/TidyLogo";
import { useState, useContext } from "preact/hooks";
import BuilderContext from "src/BuilderContext";

const LoggedIn = ({ setToken }: { setToken: any }) => {
  const loggedInUser = useContext(BuilderContext)?.loggedInUser || "";
  return (
    <div className="section login">
      <div className="navigation"></div>
      <TidyLogo />
      <h2>
        You're logged in as
        <br />
        <br />
        <strong>{loggedInUser}</strong>
      </h2>
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
        <a href={"#"}>Privacy policy</a> and <a href={"#"}>Terms of service</a>
      </footer>
    </div>
  );
};

export default LoggedIn;
