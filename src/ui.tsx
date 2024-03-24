/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@create-figma-plugin/ui";

import { emit, on } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import BuilderContext from "./BuilderContext";
import CancelPopup from "./ui_components/popups/cancelPopup";
import FeedbackPopup from "./ui_components/popups/feedbackPopup";
import ResetPopup from "./ui_components/popups/resetPopup";
import DeletePopup from "./ui_components/popups/deletePopup";
import PreviewPopup from "./ui_components/popups/previewPopup";
import PasswordResetPopup from "./ui_components/popups/passwordResetPopup";
import DeleteAccountPopup from "./ui_components/popups/deleteAccountPopup";
import WaitingInfoPopup from "./ui_components/popups/waitingInfoPopup";
import Toast from "./ui_components/Toast";
//dependencies
import { sendRaster } from "./ui_components/ui_functions/sendRaster";
import fetchAndUpdateData from "./ui_components/ui_functions/fetchAndUpdateData";

//new components
import ContentFromServer from "./ui_components/ContentFromServer";
// import ContentFromServerViewMode from "./ui_components/ContentFromServerViewMode";
import DetailsPage from "./ui_components/ViewModeElements/DetailsPage";
import Footer from "./ui_components/Footer";
import Header from "./ui_components/Header";
import IndexPage from "./ui_components/IndexPage";
import LoaderPage from "./ui_components/LoadingPage";
import LoggedIn from "./ui_components/LoggedInPage";
import Login from "./ui_components/LoginPage";
import SignIn from "./ui_components/SigninPage";
import Settings from "./ui_components/SettingsPage";
import MainContent from "./ui_components/MainContent";
import {
  getDocumentations,
  updateDocumentation,
  createDocumentation,
} from "./ui_components/ui_functions/documentationHandlers";

import { useAtom } from "jotai";
import {
  selectedNodeIdAtom,
  selectedNodeKeyAtom,
  selectedComponentPicAtom,
  isViewModeOpenAtom,
} from "./state/atoms";

//styles
import "!./styles.css";

function Plugin() {
  //!Jotai states
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeIdAtom);
  const [selectedNodeKey, setSelectedNodeKey] = useAtom(selectedNodeKeyAtom);
  const [selectedComponentPic, setSelectedComponentPic] = useAtom(
    selectedComponentPicAtom
  );
  const [isViewModeOpen] = useAtom(isViewModeOpenAtom);

  //!TODO: plugin-level states
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  //loading state
  const [isLoading, setIsLoading] = useState(true);
  //saved token
  const [token, setToken] = useState("");
  //logged in user data
  const [loggedInUser, setLoggedInUser] = useState("");
  //current session user data
  const [currentUser, setCurrentUser] = useState("");
  const [currentDocument, setCurrentDocument] = useState("");
  const [currentPage, setCurrentPage] = useState("");

  //navigation
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSigninPage, setShowSigninPage] = useState(false);
  const [showIndexPage, setShowIndexPage] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showContentFromServer, setShowContentFromServer] = useState(false);
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  //navigation-popups
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showWaitingInfoPopup, setShowWaitingInfoPopup] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [showPasswordResetPopup, setShowPasswordResetPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);

  //data from server
  const [dataForUpdate, setDataForUpdate] = useState<any>({});
  //build documentation
  const [isBuilding, setIsBuilding] = useState(false);
  //if we need to build on canvas
  const [isBuildingOnCanvas, setIsBuildingOnCanvas] = useState(true);
  //is plugin first time open
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isDocJustOpened, setIsDocJustOpened] = useState(true);

  //show toast
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("idle");

  //!TODO: documentatation level states
  //documentation title
  const [documentationTitle, setDocumentationTitle] = useState("");
  const [documentationId, setDocumentationId] = useState("");
  //work in progress
  const [isWip, setIsWip] = useState(false);
  //selected element
  const [selectedElement, setSelectedElement] = useState<any>(null);
  // const [selectedElementKey, setSelectedElementKey] = useState<any>("");
  const [selectedElementName, setSelectedElementName] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>("");
  //selected cards
  const [selectedSections, setSelectedSections] = useState<any[]>([]);
  //element to delete
  const [elementToDelete, setElementToDelete] = useState("");
  //documentation
  const [documentationData, setDocumentationData] = useState<any>({ docs: [] });
  //preview data
  const [previewData, setPreviewData] = useState<any>({});
  const [isPreviewing, setIsPreviewing] = useState(false);
  //is scroll
  const [isScroll, setIsScroll] = useState(false);
  //set selected master id
  const [selectedMasterId, setSelectedMasterId] = useState("");
  //is new element found
  const [, setIsNewElementFound] = useState(false);
  //is content from server
  const [isFromSavedData, setIsFromSavedData] = useState(false);
  //found existing documentation
  const [, setFoundDocumentation]: any = useState(null);
  //reset documentation
  const [isReset, setIsReset] = useState(false);
  //is draft
  const [isDraft, setIsDraft] = useState(false);
  //is pd section open
  const [isPdSectionOpen, setIsPdSectionOpen] = useState(true);
  //user rank
  const [userRank, setUserRank] = useState("");

  // //anatomy section image
  // const [anatomySectionImage, setAnatomySectionImage] = useState("");
  // const [spacingSectionImage, setSpacingSectionImage] = useState("");
  // const [propertySectionImage, setPropertySectionImage] = useState("");
  // const [variantsSectionImage, setVariantsSectionImage] = useState("");

  //current image array
  const [currentImageArray, setCurrentImageArray] = useState<Uint8Array | null>(
    null
  );

  // const [componentPics, setComponentPics] = useState<any>({});

  //current image type
  // const [currentImageType, setCurrentImageType] = useState("");

  //is current name valid
  const [isCurrentNameValid, setIsCurrentNameValid] = useState(true);

  on("AUTH_CHANGE", async (token, email) => {
    if (token) {
      setToken(token);
      setLoggedInUser(email);
      const data = await getDocumentations(token);
      setDataForUpdate(data);
      setIsLoading(false);
    } else {
      setShowLoginPage(true);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    console.log("documentationData", documentationData);
  }, [documentationData]);

  on("SELECTION", ({ defaultNode, name, key }) => {
    setSelectedElement(defaultNode);
    setSelectedNodeId(defaultNode.id);
    setSelectedElementName(name);
    setSelectedNodeKey(key);
    setDocumentationData((prevDocumentation: any) => {
      return {
        ...prevDocumentation,
        // ["_id"]: documentationId,
        ["componentKey"]: selectedNodeKey,
        ["nodeId"]: selectedNodeId || "",
        ["docs"]: [],
        ["title"]: documentationTitle,
        ["draft"]: isDraft,
        ["inProgress"]: isWip,
      };
    });
  });

  useEffect(() => {
    const currentSections = JSON.parse(JSON.stringify(selectedSections));
    setDocumentationData((prevDocumentation: any) => {
      return {
        ...prevDocumentation,
        ["docs"]: currentSections,
      };
    });
  }, [selectedSections]);

  // useEffect(() => {
  //   console.log("selectedNodeId", selectedNodeId);
  // }, [selectedNodeId]);

  //   on("USER_EMAIL", (email) => {
  //     setLoggedInUser(email);
  //   });

  on("SESSION", ({ user, document, page }) => {
    setCurrentUser(user);
    setCurrentDocument(document);
    setCurrentPage(page);
  });

  on("FOUND_ELEMENT", (foundElement, foundElementName, key) => {
    setIsNewElementFound(true);
    setSelectedElement(foundElement);
    setSelectedElementName(foundElementName);
    setSelectedNodeKey(key);
  });

  on("COMPONENT_PIC_FOR_UPLOAD", async ({ bytes }) => {
    setCurrentImageArray(bytes);
  });

  function checkIfDocumentationExists(docs: any[], id: string) {
    if (docs.length && id) {
      return docs.find((doc) => doc._id === id);
    }
  }

  async function uploadComponentPic(bytes: Uint8Array, loggedInUser: string) {
    const url = await sendRaster(bytes, loggedInUser, "componentPic");
    if (url) {
      setSelectedComponentPic(url);
    }
  }

  useEffect(() => {
    if (currentImageArray) {
      uploadComponentPic(currentImageArray, loggedInUser);
    }
  }, [currentImageArray]);

  useEffect(() => {
    const found = checkIfDocumentationExists(dataForUpdate, selectedNodeKey);
    if (found && showMainContent && selectedElementName.length) {
      setFoundDocumentation(found);
      setIsToastOpen(true);
      setToastType("idle");
      setToastMessage(
        `Documentations must be unique, this element already have one in: \n${found.title}`
      );
      setSelectedElement(null);
      setSelectedElementName("");
    }
  }, [selectedNodeKey, selectedElement]);

  useEffect(() => {
    if (
      selectedElementName.length &&
      dataForUpdate.length &&
      !showMainContent &&
      !showContentFromServer
    ) {
      const found = dataForUpdate.find(
        (doc: any) => doc._id === selectedNodeKey
      );
      if (found) {
        setShowIndexPage(false);
        setShowContentFromServer(true);
        setSelectedMasterId(selectedNodeKey);
      }
    }
  }, [selectedElementName, dataForUpdate]);

  (function bodyScroll() {
    document.body.onscroll = function () {
      if (document.body.scrollTop == 0) {
        setIsScroll(false);
      } else {
        setIsScroll(true);
      }
    };
  })();

  useEffect(() => {
    if (showMainContent || showContentFromServer) {
      setIsFirstTime(false);
    }
  }, [showMainContent, showContentFromServer]);

  useEffect(() => {
    if (isReset) {
      setDocumentationTitle("");
      setIsWip(false);
      setSelectedElement(null);
      setSelectedElementName("");
      setSelectedCard("");
      setSelectedNodeKey("");
      setSelectedSections([]);
      setDocumentationData({ docs: [] });
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    if (documentationTitle) {
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          ["title"]: documentationTitle,
          ["inProgress"]: isWip,
          ["draft"]: isDraft,
        };
      });
    }
  }, [documentationTitle, isWip, isDraft]);

  useEffect(() => {
    if (selectedNodeKey) {
      // if (!selectedComponentPic) {
      //   emit("GET_COMPONENT_PIC", selectedNodeKey, selectedNodeId);
      // }
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          ["componentKey"]: selectedNodeKey,
          ["nodeId"]: selectedNodeId,
        };
      });
    } else {
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          ["componentKey"]: "",
          ["nodeId"]: "",
        };
      });
    }
  }, [selectedNodeKey, selectedNodeId]);

  useEffect(() => {
    if (selectedComponentPic) {
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          ["componentPic"]: selectedComponentPic,
        };
      });
    } else {
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          ["componentPic"]: "",
        };
      });
    }
  }, [selectedComponentPic]);

  function closePopup() {
    setIsToastOpen(false);
  }

  useEffect(() => {
    if (documentationTitle && dataForUpdate.length) {
      const foundDoc = dataForUpdate.find(
        (doc: any) =>
          doc.title.toLowerCase() === documentationTitle.toLowerCase()
      );
      const foundDocId = foundDoc?._id;
      const foundDocTitle = foundDoc?.title;
      if (foundDocId && foundDocTitle && foundDocId !== selectedMasterId) {
        setIsCurrentNameValid(false);
        setIsToastOpen(true);
        setToastMessage("Documentation title must be unique");
        setToastType("error");
      } else {
        setIsCurrentNameValid(true);
      }
    }
  }, [documentationTitle]);

  async function handleAddDocumentation(token: string, data: any) {
    setIsLoading(true);
    try {
      const result = await getDocumentations(token);
      const isDocumented = result.some((doc: any) => doc._id === data._id);

      if (isDocumented) {
        const response = await updateDocumentation(token, data._id, data);
        if (isBuildingOnCanvas) emit("BUILD", response);
        await fetchAndUpdateData(token, setDataForUpdate);
      } else {
        const response = await createDocumentation(token, data);
        if (isBuildingOnCanvas) emit("BUILD", response);
        await fetchAndUpdateData(token, setDataForUpdate);
        setDocumentationData((prevDocumentation: any) => {
          return {
            ...prevDocumentation,
            ["_id"]: response._id,
          };
        });
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
    setIsBuilding(false);
    setIsBuildingOnCanvas(false);
  }

  useEffect(() => {
    if (Object.keys(documentationData).length > 0 && isBuilding && token) {
      handleAddDocumentation(token, documentationData);
    }
  }, [documentationData, isBuilding, token]);

  useEffect(() => {
    console.log("selectedMasterId", selectedMasterId);
  }, [selectedMasterId]);

  const contextStates = {
    currentDocument,
    currentPage,
    currentUser,
    documentationData,
    documentationTitle,
    isBuilding,
    isContenFromServerOpen: showContentFromServer,
    isDraft,
    isFromSavedData,
    isIndexOpen: showIndexPage,
    isLoading,
    isLoginPageOpen: showLoginPage,
    isMainContentOpen: showMainContent,
    isPdSectionOpen,
    isReset,
    isScroll,
    isWip,
    loggedInUser,
    selectedCard,
    selectedElement,
    // selectedElementKey,
    selectedElementName,
    selectedSections,
    showCancelPopup,
    showResetPopup,
    token,
    isCurrentNameValid,
    showPreviewPopup,
    selectedMasterId,
    previewData,
    isPreviewing,
    dataForUpdate,
    setCurrentDocument,
    setCurrentPage,
    setCurrentUser,
    setDataForUpdate,
    setDocumentationData,
    setDocumentationTitle,
    setIsBuilding,
    setIsContenFromServerOpen: setShowContentFromServer,
    setIsDraft,
    setIsFromSavedData,
    setIsIndexOpen: setShowIndexPage,
    setIsLoading,
    setIsMainContentOpen: setShowMainContent,
    setIsPdSectionOpen,
    setIsReset,
    setIsWip,
    setLoggedInUser,
    setSelectedCard,
    setSelectedElement,
    // setSelectedElementKey,
    setSelectedMasterId,
    setSelectedElementName,
    setSelectedSections,
    setShowCancelPopup,
    setShowResetPopup,
    setIsCurrentNameValid,
    setShowPreviewPopup,
    setPreviewData,
    setIsPreviewing,
    documentationId,
    setDocumentationId,
    isSettingsPageOpen: showSettingsPage,
    setIsSettingsPageOpen: setShowSettingsPage,
    showDeleteAccountPopup,
    setShowDeleteAccountPopup,
    setToken,
  };

  // function closeAllPopups() {
  //   setShowCancelPopup(false);
  //   setShowResetPopup(false);
  //   setShowDeletePopup(false);
  // }

  const isPreviewDataExists = Object.keys(previewData).length > 0;

  useEffect(() => {
    console.log("showContentFromServer", showContentFromServer);
    console.log("showMainContent", showMainContent);
  }, [showContentFromServer, showMainContent]);

  return (
    <div
      className={"container"}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setShowCancelPopup(false);
          setShowResetPopup(false);
          setShowDeletePopup(false);
          setShowPreviewPopup(false);
          setShowDeleteAccountPopup(false);
        }
      }}
    >
      <BuilderContext.Provider value={contextStates}>
        {showFeedbackPopup && (
          <FeedbackPopup
            show={showFeedbackPopup}
            setShow={setShowFeedbackPopup}
            user={currentUser}
          />
        )}
        {isLoading && <LoaderPage />}
        {showPreviewPopup && isPreviewDataExists && <PreviewPopup />}
        {showCancelPopup && <CancelPopup />}
        {showResetPopup && <ResetPopup />}
        {showDeletePopup && (
          <DeletePopup
            setShowDeletePopup={setShowDeletePopup}
            elementToDelete={elementToDelete}
            dataForUpdate={dataForUpdate}
          />
        )}
        {showWaitingInfoPopup && (
          <WaitingInfoPopup setShowWaitingInfoPopup={setShowWaitingInfoPopup} />
        )}
        {showDeleteAccountPopup && (
          <DeleteAccountPopup
            setShowDeleteAccountPopup={setShowDeleteAccountPopup}
            setIsSettingsPageOpen={setShowSettingsPage}
            setIsLoginPageOpen={setShowLoginPage}
          />
        )}
        {showPasswordResetPopup && (
          <PasswordResetPopup
            show={showPasswordResetPopup}
            setShow={setShowPasswordResetPopup}
            user={currentUser}
          />
        )}
        {isToastOpen && toastMessage && (
          <Toast message={toastMessage} onClose={closePopup} type={toastType} />
        )}
        {!token && showLoginPage && (
          <Login
            setToken={setToken}
            setIsLoginFailed={setIsLoginFailed}
            isLoginFailed={isLoginFailed}
            setIsLoginPageOpen={setShowLoginPage}
            setIsSettingPageOpen={setShowSettingsPage}
            setIsSigninPageOpen={setShowSigninPage}
            setShowPasswordResetPopup={setShowPasswordResetPopup}
            setShowWaitingInfoPopup={setShowWaitingInfoPopup}
            setUserRank={setUserRank}
          />
        )}
        {!token && showSigninPage && (
          <SignIn
            setToken={setToken}
            setIsLoginFailed={setIsLoginFailed}
            isLoginFailed={isLoginFailed}
            setIsLoginPageOpen={setShowLoginPage}
            setIsLoading={setIsLoading}
            setIsSigninPageOpen={setShowSigninPage}
            setIsSettingPageOpen={setShowSettingsPage}
            setShowWaitingInfoPopup={setShowWaitingInfoPopup}
          />
        )}
        <Header
          isLoginPageOpen={showLoginPage}
          setIsLoginPageOpen={setShowLoginPage}
          setFeedbackPage={setShowFeedbackPopup}
          isIndexOpen={showIndexPage}
          isDocJustOpened={isDocJustOpened}
          setIsDocJustOpened={setIsDocJustOpened}
          userRank={userRank}
        />
        {showLoginPage && token && <LoggedIn setToken={setToken} />}

        {!showLoginPage &&
          !showSigninPage &&
          isFirstTime &&
          !showMainContent &&
          !showSettingsPage && (
            <IndexPage
              data={dataForUpdate}
              setDataForUpdate={setDataForUpdate}
              setSelectedMasterId={setSelectedMasterId}
              setIsIndexOpen={setShowIndexPage}
              setIsContenFromServerOpen={setShowContentFromServer}
              setIsFromSavedData={setIsFromSavedData}
              setShowDeletePopup={setShowDeletePopup}
              setElementToDelete={setElementToDelete}
              token={token}
            />
          )}

        {!showLoginPage &&
          !showSigninPage &&
          !isFirstTime &&
          showIndexPage &&
          !showSettingsPage && (
            <IndexPage
              data={dataForUpdate}
              setDataForUpdate={setDataForUpdate}
              setSelectedMasterId={setSelectedMasterId}
              setIsIndexOpen={setShowIndexPage}
              setIsContenFromServerOpen={setShowContentFromServer}
              setIsFromSavedData={setIsFromSavedData}
              setShowDeletePopup={setShowDeletePopup}
              setElementToDelete={setElementToDelete}
              token={token}
            />
          )}
        {showMainContent && (
          <MainContent
            selectedSections={selectedSections}
            setSelectedSections={setSelectedSections}
          />
        )}

        {/* content in Edit mode */}
        {selectedMasterId &&
          !showMainContent &&
          showContentFromServer &&
          !showLoginPage &&
          !showSigninPage &&
          !isViewModeOpen && (
            <ContentFromServer
              data={dataForUpdate}
              selectedMasterId={selectedMasterId}
              selectedSections={selectedSections}
              setSelectedSections={setSelectedSections}
              //! add component key
            />
          )}
        {/* content in View mode */}
        {selectedMasterId &&
          showContentFromServer &&
          !showMainContent &&
          !showLoginPage &&
          !showSigninPage &&
          isViewModeOpen && (
            <DetailsPage
              data={dataForUpdate}
              selectedMasterId={selectedMasterId}
            />
          )}
        {showSettingsPage && <Settings />}

        {!showLoginPage &&
          !showSigninPage &&
          !showIndexPage &&
          !showSettingsPage &&
          !isViewModeOpen && (
            <Footer
              setIsBuilding={(value: boolean) => setIsBuilding(value)}
              setIsBuildingOnCanvas={(value: boolean) =>
                setIsBuildingOnCanvas(value)
              }
            />
          )}
      </BuilderContext.Provider>
    </div>
  );
}

export default render(Plugin);

// async function fetchAndUpdateData(token: string, setDataForUpdate: any) {
//   const newData = await getDocumentations(token);
//   setDataForUpdate(newData);
// }
