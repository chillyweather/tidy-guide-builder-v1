import { render } from "@create-figma-plugin/ui";

import { emit, on, once } from "@create-figma-plugin/utilities";
import { JSX, h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import BuilderContext from "./BuilderContext";
import sectionData from "./resources/sectionData";
import CancelPopup from "./ui_components/popups/cancelPopup";
import FeedbackPopup from "./ui_components/popups/feedbackPopup";
import ResetPopup from "./ui_components/popups/resetPopup";
import DeletePopup from "./ui_components/popups/deletePopup";
import PreviewPopup from "./ui_components/popups/previewPopup";
import PasswordResetPopup from "./ui_components/popups/passwordResetPopup";
import Toast from "./ui_components/Toast";
//dependencies
import { uploadFileToServer } from "./ui_components/ui_functions/fileManagementFunctions";
import { sendRaster } from "./ui_components/ui_functions/sendRaster";

//new components
import ContentFromServer from "./ui_components/ContentFromServer";
import Footer from "./ui_components/Footer";
import Header from "./ui_components/Header";
import IndexPage from "./ui_components/IndexPage";
import LoaderPage from "./ui_components/LoadingPage";
import LoggedIn from "./ui_components/LoggedInPage";
import Login from "./ui_components/LoginPage";
import SignIn from "./ui_components/SigninPage";
import MainContent from "./ui_components/MainContent";
import {
  getDocumentations,
  updateDocumentation,
  createDocumentation,
} from "./ui_components/ui_functions/documentationHandlers";

//styles
import "!./styles.css";

function Plugin() {
  //saved token
  const [token, setToken] = useState("");

  //documentation title
  const [documentationTitle, setDocumentationTitle] = useState("");

  //work in progress
  const [isWip, setIsWip] = useState(false);

  const [isLoginFailed, setIsLoginFailed] = useState(false);

  //current session user data
  const [currentUser, setCurrentUser] = useState("");
  const [currentDocument, setCurrentDocument] = useState("");
  const [currentPage, setCurrentPage] = useState("");

  //logged in user data
  const [loggedInUser, setLoggedInUser] = useState("");

  //loading state
  const [isLoading, setIsLoading] = useState(true);

  //selected element
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [selectedElementKey, setSelectedElementKey] = useState<any>("");
  const [selectedElementName, setSelectedElementName] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>("");

  //selected cards
  const [selectedSections, setSelectedSections] = useState<any[]>([]);

  //feedback
  const [feedbackPage, setFeedbackPage] = useState(false);

  //popups
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [showPasswordResetPopup, setShowPasswordResetPopup] = useState(false);

  //element to delete
  const [elementToDelete, setElementToDelete] = useState("");

  //page states
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
  const [isSigninPageOpen, setIsSigninPageOpen] = useState(false);

  //documentation
  const [documentationData, setDocumentationData] = useState<any>({ docs: [] });

  //preview data
  const [previewData, setPreviewData] = useState<any>({});
  const [isPreviewing, setIsPreviewing] = useState(false);

  //is scroll
  const [isScroll, setIsScroll] = useState(false);

  //build documentation
  const [isBuilding, setIsBuilding] = useState(false);

  //data from server
  const [dataForUpdate, setDataForUpdate] = useState<any>({});

  //set selected master id
  const [selectedMasterId, setSelectedMasterId] = useState("");

  //is new element found
  const [isNewElementFound, setIsNewElementFound] = useState(false);

  //is plugin first time open
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isDocJustOpened, setIsDocJustOpened] = useState(true);

  //is content from server
  const [isFromSavedData, setIsFromSavedData] = useState(false);

  //page navigation
  const [isIndexOpen, setIsIndexOpen] = useState(true);
  const [isMainContentOpen, setIsMainContentOpen] = useState(false);
  const [isContenFromServerOpen, setIsContenFromServerOpen] = useState(false);

  //found existing documentation
  const [foundDocumentation, setFoundDocumentation]: any = useState(null);

  //show toast
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("idle");

  //reset documentation
  const [isReset, setIsReset] = useState(false);

  //is draft
  const [isDraft, setIsDraft] = useState(false);

  //if we need to build on canvas
  const [isBuildingOnCanvas, setIsBuildingOnCanvas] = useState(true);

  //is pd section open
  const [isPdSectionOpen, setIsPdSectionOpen] = useState(true);

  //anatomy section image
  const [anatomySectionImage, setAnatomySectionImage] = useState("");
  const [spacingSectionImage, setSpacingSectionImage] = useState("");
  const [propertySectionImage, setPropertySectionImage] = useState("");
  const [variantsSectionImage, setVariantsSectionImage] = useState("");

  //current image array
  const [currentImageArray, setCurrentImageArray] = useState<Uint8Array | null>(
    null
  );

  //current image type
  const [currentImageType, setCurrentImageType] = useState("");

  //is current name valid
  const [isCurrentNameValid, setIsCurrentNameValid] = useState(true);

  on("AUTH_CHANGE", async (token) => {
    if (token) {
      setToken(token);
      const data = await getDocumentations(token);
      setDataForUpdate(data);
      setIsLoading(false);
    } else {
      setIsLoginPageOpen(true);
      setIsLoading(false);
    }
  });

  on("SELECTION", ({ defaultNode, name, key }) => {
    setSelectedElement(defaultNode);
    setSelectedElementName(name);
    setSelectedElementKey(key);
    setDocumentationData((prevDocumentation: any) => {
      return {
        ...prevDocumentation,
        // ["_id"]: key,
        ["componentKey"]: key,
        ["nodeId"]: defaultNode.id || "",
        ["docs"]: [],
        ["title"]: documentationTitle,
        ["draft"]: isDraft,
        ["inProgress"]: isWip,
      };
    });
  });

  // useEffect(() => {
  //   console.log("documentationData", documentationData);
  // }, [documentationData]);

  on("USER_EMAIL", (email) => {
    setLoggedInUser(email);
  });

  on("SESSION", ({ user, document, page }) => {
    setCurrentUser(user);
    setCurrentDocument(document);
    setCurrentPage(page);
  });

  on("FOUND_ELEMENT", (foundElement, foundElementName, key) => {
    setIsNewElementFound(true);
    setSelectedElement(foundElement);
    setSelectedElementName(foundElementName);
    setSelectedElementKey(key);
  });

  on("IMAGE_ARRAY_FOR_UPLOAD", async ({ bytes, type }) => {
    setCurrentImageArray(bytes);
    setCurrentImageType(type);
  });

  function checkIfDocumentationExists(docs: any[], id: string) {
    if (docs.length && id) {
      return docs.find((doc) => doc._id === id);
    }
  }

  useEffect(() => {
    const found = checkIfDocumentationExists(dataForUpdate, selectedElementKey);
    if (found && isMainContentOpen && selectedElementName.length) {
      setFoundDocumentation(found);
      setIsToastOpen(true);
      setToastType("idle");
      setToastMessage(
        `Documentations must be unique, this element already have one in: \n${found.title}`
      );
      setSelectedElement(null);
      setSelectedElementName("");
    }
  }, [selectedElementKey, selectedElement]);

  useEffect(() => {
    if (
      loggedInUser &&
      currentImageArray &&
      currentImageArray.length &&
      currentImageType
    ) {
      sendRaster(currentImageArray, loggedInUser, currentImageType);
    }
  }, [loggedInUser, currentImageArray, currentImageType]);

  // if selected element's name in data for update
  useEffect(() => {
    if (
      selectedElementName.length &&
      dataForUpdate.length &&
      !isMainContentOpen &&
      !isContenFromServerOpen
    ) {
      const found = dataForUpdate.find(
        (doc: any) => doc._id === selectedElementKey
      );
      if (found) {
        setIsIndexOpen(false);
        setIsContenFromServerOpen(true);
        setSelectedMasterId(selectedElementKey);
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
    if (isMainContentOpen || isContenFromServerOpen) {
      setIsFirstTime(false);
    }
  }, [isMainContentOpen, isContenFromServerOpen]);

  useEffect(() => {
    if (isReset) {
      setDocumentationTitle("");
      setIsWip(false);
      setSelectedElement(null);
      setSelectedElementName("");
      setSelectedCard("");
      setSelectedElementKey("");
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

  // useEffect(() => {
  //   if (token && selectedElementKey && selectedElement) {
  //     emit("PIC_FROM_FIGMA", {
  //       type: "anatomy",
  //       nodeId: selectedElement.id,
  //       key: selectedElementKey,
  //     });
  //   }
  // }, [token, selectedElementKey, selectedElement]);

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
      if (foundDocId && foundDocTitle && foundDocId !== selectedElementKey) {
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
      console.log(" result", result);
      console.log(" data", data);
      const isDocumented = result.some((doc: any) => doc._id === data._id);

      if (isDocumented) {
        const response = await updateDocumentation(token, data._id, data);
        if (isBuildingOnCanvas) emit("BUILD", response);
        const newData = await getDocumentations(token);
        setDataForUpdate(newData);
      } else {
        const response = await createDocumentation(token, data);
        if (isBuildingOnCanvas) emit("BUILD", response);
        const newData = await getDocumentations(token);
        setDataForUpdate(newData);
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

  const contextStates = {
    anatomySectionImage,
    currentDocument,
    currentPage,
    currentUser,
    documentationData,
    documentationTitle,
    isBuilding,
    isContenFromServerOpen,
    isDraft,
    isFromSavedData,
    isIndexOpen,
    isLoading,
    isLoginPageOpen,
    isMainContentOpen,
    isPdSectionOpen,
    isReset,
    isScroll,
    isWip,
    loggedInUser,
    propertySectionImage,
    selectedCard,
    selectedElement,
    selectedElementKey,
    selectedElementName,
    selectedSections,
    showCancelPopup,
    showResetPopup,
    spacingSectionImage,
    token,
    variantsSectionImage,
    isCurrentNameValid,
    showPreviewPopup,
    selectedMasterId,
    previewData,
    isPreviewing,
    setAnatomySectionImage,
    setCurrentDocument,
    setCurrentPage,
    setCurrentUser,
    setDataForUpdate,
    setDocumentationData,
    setDocumentationTitle,
    setIsBuilding,
    setIsContenFromServerOpen,
    setIsDraft,
    setIsFromSavedData,
    setIsIndexOpen,
    setIsLoading,
    setIsMainContentOpen,
    setIsPdSectionOpen,
    setIsReset,
    setIsWip,
    setLoggedInUser,
    setPropertySectionImage,
    setSelectedCard,
    setSelectedElement,
    setSelectedElementKey,
    setSelectedElementName,
    setSelectedSections,
    setShowCancelPopup,
    setShowResetPopup,
    setSpacingSectionImage,
    setVariantsSectionImage,
    setIsCurrentNameValid,
    setShowPreviewPopup,
    setPreviewData,
    setIsPreviewing,
  };

  // function closeAllPopups() {
  //   setShowCancelPopup(false);
  //   setShowResetPopup(false);
  //   setShowDeletePopup(false);
  // }

  const isPreviewDataExists = Object.keys(previewData).length > 0;

  return (
    <div
      className={"container"}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setShowCancelPopup(false);
          setShowResetPopup(false);
          setShowDeletePopup(false);
        }
      }}
    >
      <BuilderContext.Provider value={contextStates}>
        {feedbackPage && (
          <FeedbackPopup
            show={feedbackPage}
            setShow={setFeedbackPage}
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
        {!token && isLoginPageOpen && (
          <Login
            setToken={setToken}
            setIsLoginFailed={setIsLoginFailed}
            isLoginFailed={isLoginFailed}
            setIsLoginPageOpen={setIsLoginPageOpen}
            setIsLoading={setIsLoading}
            setIsSigninPageOpen={setIsSigninPageOpen}
            setShowPasswordResetPopup={setShowPasswordResetPopup}
          />
        )}
        {!token && isSigninPageOpen && (
          <SignIn
            setToken={setToken}
            setIsLoginFailed={setIsLoginFailed}
            isLoginFailed={isLoginFailed}
            setIsLoginPageOpen={setIsLoginPageOpen}
            setIsLoading={setIsLoading}
            setIsSigninPageOpen={setIsSigninPageOpen}
          />
        )}
        <Header
          isLoginPageOpen={isLoginPageOpen}
          setIsLoginPageOpen={setIsLoginPageOpen}
          setFeedbackPage={setFeedbackPage}
          isIndexOpen={isIndexOpen}
          isDocJustOpened={isDocJustOpened}
          setIsDocJustOpened={setIsDocJustOpened}
        />
        {isLoginPageOpen && token && <LoggedIn setToken={setToken} />}

        {!isLoginPageOpen &&
          !isSigninPageOpen &&
          isFirstTime &&
          !isMainContentOpen && (
            <IndexPage
              data={dataForUpdate}
              setSelectedMasterId={setSelectedMasterId}
              setIsIndexOpen={setIsIndexOpen}
              setIsContenFromServerOpen={setIsContenFromServerOpen}
              setIsFromSavedData={setIsFromSavedData}
              setShowDeletePopup={setShowDeletePopup}
              setElementToDelete={setElementToDelete}
            />
          )}

        {!isLoginPageOpen &&
          !isSigninPageOpen &&
          !isFirstTime &&
          isIndexOpen && (
            <IndexPage
              data={dataForUpdate}
              setSelectedMasterId={setSelectedMasterId}
              setIsIndexOpen={setIsIndexOpen}
              setIsContenFromServerOpen={setIsContenFromServerOpen}
              setIsFromSavedData={setIsFromSavedData}
              setShowDeletePopup={setShowDeletePopup}
              setElementToDelete={setElementToDelete}
            />
          )}
        {isMainContentOpen && <MainContent />}
        {selectedMasterId &&
          !isMainContentOpen &&
          isContenFromServerOpen &&
          !isLoginPageOpen &&
          !isSigninPageOpen && (
            <ContentFromServer
              data={dataForUpdate}
              selectedMasterId={selectedMasterId}
              //! add component key
            />
          )}

        {!isLoginPageOpen && !isSigninPageOpen && !isIndexOpen && (
          <Footer
            setIsBuilding={setIsBuilding}
            setIsBuildingOnCanvas={setIsBuildingOnCanvas}
          />
        )}
      </BuilderContext.Provider>
    </div>
  );
}

export default render(Plugin);
