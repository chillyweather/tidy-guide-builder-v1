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

const Header = ({
  // resetStates,
  setIsLoginOpen,
}: any) => {
  const selectedElement = useContext(BuilderContext)?.selectedElement;
  return (
    <div className="header">
      <div className="headerContent">
        <button
          className="header-button"
          onClick={() => {
            // closeMenu();
          }}
        >
          <IconListTree />
          Components index
        </button>
        <div className="header-title">
          <IconListTree />
          Components index
        </div>
        <div className={"side-flex"}>
          <button
            className="header-login"
            onClick={() => {
              setIsLoginOpen(true);
            }}
          >
            <IconUser />
          </button>
          <button className={"login-button"}>
            <IconSettings />
          </button>
        </div>
      </div>
      {selectedElement && <HeaderActions />}
    </div>
  );
};

export default Header;
