import {
  IconArrowLeft,
  IconMessage2Check,
  IconPlus,
  IconSettings,
  IconUser,
  IconExternalLink,
} from "@tabler/icons-react";
import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
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
  const {
    selectedElement,
    selectedSections,
    setIsReset,
    setIsMainContentOpen,
    isMainContentOpen,
    setIsIndexOpen,
    setIsFromSavedData,
    setIsContenFromServerOpen,
    isContenFromServerOpen,
    documentationData,
    setIsSettingsPageOpen,
  } = useContext(BuilderContext) || {};
  const [initialSelectedSections, setInitialSelectedSections] = useState(null);
  const [initialDocumentationData, setInitialDocumentationData] =
    useState(null);
  const [initialSelectedSectionsLength, setInitialSelectedSectionsLength] =
    useState(0);

  function backToIndex() {
    setIsIndexOpen(true);
    setIsMainContentOpen(false);
    setIsContenFromServerOpen(false);
    setIsSettingsPageOpen(false);
    setIsDocJustOpened(true);
    setIsReset(true);
  }

  //! find a better way to track data changes
  useEffect(() => {
    if (documentationData && documentationData.title && isDocJustOpened) {
      setInitialDocumentationData(
        JSON.parse(JSON.stringify(documentationData)),
      );
      setInitialSelectedSections(JSON.parse(JSON.stringify(selectedSections)));
      setInitialSelectedSectionsLength(selectedSections!.length || 0);
      setIsDocJustOpened(false);
    }
  }, [documentationData]);

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
              <h2>
                Component Index
              </h2>
              <a href={"https://tidy.guide/guide/overview"} target={"_blank"} className={"link-icon"}><IconExternalLink /></a>
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
              setTimeout(function () {
                document.getElementById("feedback-title")?.focus();
              }, 300);
            }}
          >
            <IconMessage2Check />
          </button>
          <button
            className="header-login"
            onClick={() => {
              setIsLoginPageOpen(true);
              setIsSettingsPageOpen(false);
            }}
          >
            <IconUser />
          </button>
          <button
            className={"login-button"}
            onClick={() => {
              setIsLoginPageOpen(false);
              setIsIndexOpen(false);
              setIsMainContentOpen(false);
              setIsContenFromServerOpen(false);
              setIsSettingsPageOpen(true);
            }}
          >
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
