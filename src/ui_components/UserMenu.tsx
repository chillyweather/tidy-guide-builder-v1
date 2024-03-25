/* eslint-disable @typescript-eslint/ban-ts-comment */
import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import {
  IconMessage2Check,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

const UserMenu = ({
  setIsLoginPageOpen,
  setIsSettingsPageOpen,
  setIsIndexOpen,
  setIsContenFromServerOpen,
  setIsMainContentOpen,
  setFeedbackPage,
}: {
  setIsLoginPageOpen: (value: boolean) => void;
  setIsSettingsPageOpen: (value: boolean) => void;
  setIsIndexOpen: (value: boolean) => void;
  setIsContenFromServerOpen: (value: boolean) => void;
  setIsMainContentOpen: (value: boolean) => void;
  setFeedbackPage: (value: boolean) => void;
}) => {
  const loggedInUser = useContext(BuilderContext)?.loggedInUser || "";
  function closeMenu() {
    // @ts-ignore
    document.getElementById("userMenu").open = false;
  }
  return (
    <div className={"user-menu"}>
      <div className="user-item">
        <div className="user-tag" first-letter={loggedInUser.slice(0, 1)}>
          {loggedInUser.slice(0, 1)}
        </div>
        <p>{loggedInUser}</p>
      </div>

      <hr />

      <div
        className="user-item"
        onClick={() => {
          closeMenu();
          setFeedbackPage(true);
        }}
      >
        <IconMessage2Check />
        <p>Feedback</p>
      </div>

      <div
        className="user-item"
        onClick={() => {
          closeMenu();
          setIsLoginPageOpen(false);
          setIsIndexOpen(false);
          setIsMainContentOpen(false);
          setIsContenFromServerOpen(false);
          setIsSettingsPageOpen(true);
        }}
      >
        <IconSettings />
        <p>Settings</p>
      </div>

      <hr />

      <div
        className="user-item"
        onClick={() => {
          closeMenu();
          setIsIndexOpen(true);
          setIsMainContentOpen(false);
          setIsContenFromServerOpen(false);
          setIsSettingsPageOpen(false);
          setIsLoginPageOpen(true);
        }}
      >
        <IconLogout />
        <p>Log-out</p>
      </div>
    </div>
  );
};

export default UserMenu;
