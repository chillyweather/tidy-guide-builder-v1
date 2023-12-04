import { h } from "preact";
import {
  IconSettings,
  IconList,
  IconDots,
  IconUser,
  IconSearch,
  IconListTree,
} from "@tabler/icons-react";
// import Search from "./Search";
// import { closeMenu, changeText } from "../auxiliaryFunctions/navFunctions";

const Header = ({
  // resetStates,
  setIsLoginOpen,
} // setIsIndexOpen,
// textId,
// setTextId,
: any) => {
  return (
    <div className="header">
      {/* <button
        className="header-button"
        onClick={() => {
          // closeMenu();
          resetStates();
          setIsIndexOpen(true);
        }}
      >
        <IconListTree />
        Components index
      </button>
      <div className="header-title">
        <IconListTree />
        Components index
      </div> */}
      {/* <div className={"side-flex"}>
        <details
          id={"searchMenu"}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeMenu();
            }
          }}
        >
          <summary
            className={"search-button"}
            onClick={() => {
              setTimeout(function () {
                document.getElementById("searchInput")!.focus();
              }, 100);
            }}
          >
            <button>
              <IconSearch />
            </button>
          </summary>
          <Search />
        </details> */}
      <button
        className="header-login"
        onClick={() => {
          setIsLoginOpen(true);
          // setIsIndexOpen(false);
        }}
      >
        <IconUser />
      </button>
      {/* <details
          className="header-menu"
          id="headerMenu"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeMenu();
            }
          }}
          onClick={() => {
            closeMenu();
          }}
        >
          <summary>
            <button>
              <IconList />
            </button>
          </summary>
        </details>
        <details id={"textDetails"}>
          <summary>
            <button className={"login-button"}>
              <IconDots />
            </button>
          </summary>
          <div id={"text-size"}>
            <h2>Text size</h2>
            <div>
              <input
                type={"radio"}
                id={"small"}
                name={"textSize"}
                value={10}
                onClick={async (event) => {
                  await changeText(event);
                  setTextId("small");
                }}
                checked={textId === "small"}
              ></input>
              <label for={"small"}>Small</label>
              <input
                type={"radio"}
                id={"medium"}
                name={"textSize"}
                value={12}
                onClick={async (event) => {
                  await changeText(event);
                  setTextId("medium");
                }}
                checked={textId === "medium"}
              ></input>
              <label for={"medium"}>Medium</label>
              <input
                type={"radio"}
                id={"large"}
                name={"textSize"}
                value={14}
                onClick={async (event) => {
                  await changeText(event);
                  setTextId("large");
                }}
                checked={textId === "large"}
              ></input>
              <label for={"large"}>Large</label>
            </div>
          </div>
        </details>
        <button className={"login-button"}>
          <IconSettings />
        </button>
      </div> */}
    </div>
  );
};

export default Header;
