import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import {
  IconSettings,
  IconList,
  IconDots,
  IconUser,
  IconPlus,
  IconArrowLeft,
  IconMessage2Check,
  IconListTree,
} from "@tabler/icons-react";
import HeaderActions from "./HeaderActions";

const Header = ({
  isLoginPageOpen,
  setIsLoginPageOpen,
  setFeedbackPage,
  isIndexOpen,
}: {
  isLoginPageOpen: boolean;
  setIsLoginPageOpen: Function;
  setFeedbackPage: Function;
  isIndexOpen: boolean;
}) => {
  const selectedElement = useContext(BuilderContext)?.selectedElement;
  const setIsMainContentOpen = useContext(BuilderContext)?.setIsMainContentOpen;
  const isMainContentOpen = useContext(BuilderContext)?.isMainContentOpen;
  const setIsIndexOpen = useContext(BuilderContext)?.setIsIndexOpen;
  const setIsFromSavedData = useContext(BuilderContext)?.setIsFromSavedData;
  const setIsContenFromServerOpen =
    useContext(BuilderContext)?.setIsContenFromServerOpen;
  const isContenFromServerOpen =
    useContext(BuilderContext)?.isContenFromServerOpen;
  const showCancelPopup = useContext(BuilderContext)?.showCancelPopup;
  const setShowCancelPopup = useContext(BuilderContext)?.setShowCancelPopup;

  return (
    <div className="header">
      <div className="headerContent">
        {!isLoginPageOpen &&
          (isIndexOpen ? (
            <button
              className="flex-button add-button"
              onClick={() => {
                setIsIndexOpen(false);
                setIsMainContentOpen(true);
                setIsFromSavedData(false);
              }}
            >
              <IconPlus />
              Add Component
            </button>
          ) : (
            <button
              className="flex-button"
              onClick={() => {
                setShowCancelPopup(true);
              }}
            >
              <IconListTree />
              Back to components index
            </button>
          ))}

        <button
          className="header-button"
          onClick={() => {
            isLoginPageOpen && setIsLoginPageOpen(false);
          }}
        >
          <IconArrowLeft />
          Back
        </button>
        <div className={"side-flex"}>
          <button
            className="header-login"
            onClick={() => {
              setFeedbackPage(true);
            }}
          >
            <IconMessage2Check />
          </button>
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
      {(selectedElement || isMainContentOpen || isContenFromServerOpen) &&
        !isLoginPageOpen &&
        !isIndexOpen && <HeaderActions />}
    </div>
  );
};

export default Header;
