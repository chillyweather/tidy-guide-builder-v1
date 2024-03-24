/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  IconArrowLeft,
  IconEye,
  IconPencil,
  // IconMessage2Check,
  IconPlus,
  IconSettings,
  IconUser,
  IconExternalLink,
  IconList,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import {
  selectedNodeIdAtom,
  selectedNodeKeyAtom,
  selectedComponentPicAtom,
  isViewModeOpenAtom,
} from "src/state/atoms";

import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import HeaderActions from "./HeaderActions";
import { emit } from "@create-figma-plugin/utilities";
import fetchAndUpdateData from "./ui_functions/fetchAndUpdateData";

const Header = ({
  isLoginPageOpen,
  setIsLoginPageOpen,
  setFeedbackPage,
  isIndexOpen,
  isDocJustOpened,
  setIsDocJustOpened,
  userRank,
}: {
  isLoginPageOpen: boolean;
  setIsLoginPageOpen: (value: boolean) => void;
  setFeedbackPage: (value: boolean) => void;
  isIndexOpen: boolean;
  isDocJustOpened: boolean;
  setIsDocJustOpened: (value: boolean) => void;
  userRank: string;
}) => {
  const [selectedNodeId] = useAtom(selectedNodeIdAtom);
  const [selectedNodeKey] = useAtom(selectedNodeKeyAtom);
  const [selectedComponentPic] = useAtom(selectedComponentPicAtom);
  const [isViewModeOpen, setIsViewModeOpen] = useAtom(isViewModeOpenAtom);

  const [userRankStyle, setUserRankStyle] = useState({});
  const {
    token,
    documentationData,
    isContenFromServerOpen,
    isMainContentOpen,
    selectedElement,
    selectedSections,
    setIsContenFromServerOpen,
    setIsFromSavedData,
    setIsIndexOpen,
    setIsMainContentOpen,
    setIsReset,
    setIsSettingsPageOpen,
    isSettingsPageOpen,
    dataForUpdate,
    setDataForUpdate,
    selectedMasterId,
    setSelectedMasterId,
  } = useContext(BuilderContext) || {};
  const [, setInitialSelectedSections] = useState(null);
  const [, setInitialDocumentationData] = useState(null);
  const [, setInitialSelectedSectionsLength] = useState(0);
  const [navState, setNavState] = useState(false);

  function backToIndex() {
    setIsIndexOpen(true);
    setIsMainContentOpen(false);
    setIsContenFromServerOpen(false);
    setIsSettingsPageOpen(false);
    setIsDocJustOpened(true);
    setIsReset(true);
  }

  useEffect(() => {
    if (
      selectedNodeId &&
      selectedNodeKey &&
      !selectedComponentPic &&
      isMainContentOpen
    ) {
      emit("GET_COMPONENT_PIC", selectedNodeKey, selectedNodeId);
    }
  }, [
    selectedNodeId,
    selectedNodeKey,
    selectedComponentPic,
    isMainContentOpen,
  ]);

  useEffect(() => {
    console.log("userRank", userRank);
    if (userRank === "Admin") {
      setUserRankStyle({ color: "maroon" });
    } else if (userRank === "Editor") {
      setUserRankStyle({ color: "royalblue" });
    }
  }, [userRank]);

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

  function Toggle() {
    const handleToggle = async () => {
      console.log("selectedMasterId", selectedMasterId);
      if (!token) return;
      setIsViewModeOpen(!isViewModeOpen);
      setIsMainContentOpen(false);
      setIsContenFromServerOpen(true);
      await fetchAndUpdateData(token, setDataForUpdate);
      const currentDocumentation = dataForUpdate.find(
        (item: any) => item.title === documentationData.title
      );
      setSelectedMasterId(currentDocumentation._id);
    };

    return (
      <button
        className={isViewModeOpen ? "mode-button viewer" : "mode-button editor"}
        onClick={handleToggle}
      >
        <div className={"thumb"}></div>
        <IconPencil />
        <IconEye />
      </button>
    );
  }

  return (
    <div className="header">
      <div className="headerContent">
        {!isLoginPageOpen &&
          (isIndexOpen ? (
            <div className="componentHeader">
              <h2>Component Index</h2>
              <a
                href={"https://tidy.guide/guide/overview"}
                target={"_blank"}
                className={"link-icon"}
              >
                <IconExternalLink />
              </a>
              {!isViewModeOpen && (
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
              )}
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
          className="header-button back"
          onClick={() => {
            isLoginPageOpen && setIsLoginPageOpen(false);
          }}
        >
          <IconArrowLeft />
          Back
        </button>
        <div className={"side-flex"}>
          {Toggle()}
          {/* <button
            className="header-login"
            onClick={() => {
              setFeedbackPage(true);
              setTimeout(function () {
                document.getElementById("feedback-title")?.focus();
              }, 300);
            }}
          >
            <IconMessage2Check />
          </button> */}

          {!isIndexOpen &&
            isViewModeOpen &&
            !isLoginPageOpen &&
            !isSettingsPageOpen && (
              <button
                className={"navigation-button " + navState}
                onClick={() => {
                  setNavState(!navState);
                }}
                onBlur={() => {
                  setNavState(false);
                }}
              >
                <IconList />
              </button>
            )}

          <button
            className="header-login"
            onClick={() => {
              setIsLoginPageOpen(true);
              setIsSettingsPageOpen(false);
            }}
          >
            <IconUser style={userRankStyle} />
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
        !isIndexOpen &&
        !isViewModeOpen &&
        !isLoginPageOpen &&
        !isSettingsPageOpen && <HeaderActions />}
    </div>
  );
};

export default Header;
