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
  const [initialSelectedSections, setInitialSelectedSections] = useState(null);
  const [initialDocumentationData, setInitialDocumentationData] =
    useState(null);
  const [initialSelectedSectionsLength, setInitialSelectedSectionsLength] =
    useState(0);

  function backToIndex() {
    setIsIndexOpen(true);
    setIsMainContentOpen(false);
    setIsContenFromServerOpen(false);
    setIsDocJustOpened(true);
    setIsReset(true);
  }

  //! find a better way to track data changes
  useEffect(() => {
    if (documentationData && documentationData.title && isDocJustOpened) {
      setInitialDocumentationData(
        JSON.parse(JSON.stringify(documentationData))
      );
      setInitialSelectedSections(JSON.parse(JSON.stringify(selectedSections)));
      setInitialSelectedSectionsLength(selectedSections!.length || 0);
      setIsDocJustOpened(false);
    }
  }, [documentationData]);
  //
  //   console.log(
  //     "initialDocumentationData",
  //     JSON.stringify(initialDocumentationData)
  //   );
  //   console.log("documentationData", JSON.stringify(documentationData));

  function isDataChanged() {
    return (
      JSON.stringify(documentationData) !==
        JSON.stringify(initialDocumentationData) ||
      JSON.stringify(selectedSections) !==
        JSON.stringify(initialSelectedSections) ||
      selectedSections?.length !== initialSelectedSectionsLength
    );
  }

  return (
    <div className="header">
      <div className="headerContent">
        {!isLoginPageOpen &&
          (isIndexOpen ? (
            <div className="componentHeader">
              <h2>Component Index</h2>
              <button
              className="flex-button add-button"
              onClick={() => {
                setIsIndexOpen(false);
                setIsMainContentOpen(true);
                setIsFromSavedData(false);
              }}
            >
              <IconPlus />
              New Documentation
            </button>
            </div>
          ) : (
            <button
              className="flex-button back-button"
              onClick={() => {
                // isDataChanged() ? setShowCancelPopup(true) :
                backToIndex();
              }}
            >
              <IconArrowLeft />
              Back
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
