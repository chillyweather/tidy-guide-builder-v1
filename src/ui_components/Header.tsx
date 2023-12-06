import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import {
  IconSettings,
  IconList,
  IconDots,
  IconUser,
  IconSearch,
  IconListTree,
} from "@tabler/icons-react";
import HeaderActions from "./HeaderActions";

const Header = ({ isLoginPageOpen, setIsLoginPageOpen }: any) => {
  const selectedElement = useContext(BuilderContext)?.selectedElement;

  return (
    <div className="header">
      <div className="headerContent">
        <button
          className="header-button"
          onClick={() => {
            isLoginPageOpen && setIsLoginPageOpen(false);
          }}
        >
          <IconListTree />
          {isLoginPageOpen ? "Back" : "Components index"}
        </button>
        <div className={"side-flex"}>
          <button
            className="header-login"
            onClick={() => {
              setIsLoginPageOpen(true);
            }}
          >
            <IconUser />
          </button>
          <button className={"login-button"}>
            <IconSettings />
          </button>
        </div>
      </div>
      {selectedElement && !isLoginPageOpen && <HeaderActions />}
    </div>
  );
};

export default Header;
