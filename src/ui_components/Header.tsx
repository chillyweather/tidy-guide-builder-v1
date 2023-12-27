import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
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
  isDocJustOpened,
  setIsDocJustOpened,
}: {
  isLoginPageOpen: boolean;
  setIsLoginPageOpen: Function;
  setFeedbackPage: Function;
  isIndexOpen: boolean;
  isDocJustOpened: boolean;
  setIsDocJustOpened: Function;
}) => {
  const [initialSelectedSections, setInitialSelectedSections] = useState(null);
  const [initialDocumentationData, setInitialDocumentationData] =
    useState(null);
  const selectedElement = useContext(BuilderContext)?.selectedElement;
  const selectedSections = useContext(BuilderContext)?.selectedSections;
  const setIsReset = useContext(BuilderContext)?.setIsReset;
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
  const documentationData = useContext(BuilderContext)?.documentationData;

  function backToIndex() {
    setIsIndexOpen(true);
    setIsMainContentOpen(false);
    setIsContenFromServerOpen(false);
    setIsDocJustOpened(true);
    setIsReset(true);
  }

  console.log("isDocJustOpened", isDocJustOpened);
  useEffect(() => {
    if (documentationData && documentationData.title && isDocJustOpened) {
      setInitialDocumentationData(
        JSON.parse(JSON.stringify(documentationData))
      );
      setInitialSelectedSections(JSON.parse(JSON.stringify(selectedSections)));
      setIsDocJustOpened(false);
    }
  }, [documentationData]);

  console.log(
    "initialDocumentationData",
    JSON.stringify(initialDocumentationData)
  );
  console.log("documentationData", JSON.stringify(documentationData));

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
                JSON.stringify(documentationData) !==
                  JSON.stringify(initialDocumentationData) &&
                JSON.stringify(selectedSections) !==
                  JSON.stringify(initialSelectedSections)
                  ? setShowCancelPopup(true)
                  : backToIndex();
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
