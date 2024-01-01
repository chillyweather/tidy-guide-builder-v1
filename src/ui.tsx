import { render } from "@create-figma-plugin/ui";

import { emit, on, once } from "@create-figma-plugin/utilities";
import { JSX, h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import BuilderContext from "./BuilderContext";
import sectionData from "./resources/sectionData";
import CancelPopup from "./ui_components/popups/cancelPopup";
import FeedbackPopup from "./ui_components/popups/feedbackPopup";
import ResetPopup from "./ui_components/popups/resetPopup";
import Toast from "./ui_components/Toast";
//dependencies

//new components
import ContentFromServer from "./ui_components/ContentFromServer";
import Footer from "./ui_components/Footer";
import Header from "./ui_components/Header";
import IndexPage from "./ui_components/IndexPage";
import LoaderPage from "./ui_components/LoadingPage";
import LoggedIn from "./ui_components/LoggedInPage";
import Login from "./ui_components/LoginPage";
import MainContent from "./ui_components/MainContent";
import { getDocumentations } from "./ui_components/ui_functions/documentationHandlers";

//styles
import "!./styles.css";
import EmptyState from "./ui_components/EmptyState";

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

  //page states
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);

  //documentation
  const [documentationData, setDocumentationData] = useState<any>({ docs: [] });

  //is scroll
  const [isScroll, setIsScroll] = useState(false);

  //build documentation
  const [isBuilding, setIsBuilding] = useState(false);

  //data from server
  const [dataForUpdate, setDataForUpdate] = useState<any>({});

  //set selected master id
  const [selectedMasterId, setSelectedMasterId] = useState("");

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
  const [foundDocumentation, setFoundDocumentation] = useState(null);

  //show toast
  const [isToastOpen, setIsToastOpen] = useState(false);

  //reset documentation
  const [isReset, setIsReset] = useState(false);

  on("AUTH_CHANGE", async (token) => {
    if (token) {
      setToken(token);
      const data = await getDocumentations(token);
      setDataForUpdate(data);
      setIsLoading(false);
    }
  });

  on("SELECTION", ({ defaultNode, name, key }) => {
    // if (defaultNode) setIsMainContentOpen(true);
    setSelectedElement(defaultNode);
    setSelectedElementName(name);
    setSelectedElementKey(key);
    setDocumentationData((prevDocumentation: any) => {
      return {
        ...prevDocumentation,
        ["_id"]: key,
        ["docs"]: [],
        ["title"]: "",
        ["inProgress"]: isWip,
      };
    });
  });

  on("USER_EMAIL", (email) => {
    setLoggedInUser(email);
  });

  on("SESSION", ({ user, document, page }) => {
    setCurrentUser(user);
    setCurrentDocument(document);
    setCurrentPage(page);
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
      // alert(
      //   `Documentation for this element already exists (${found.title}). Please choose another element or edit the existing documentation.`
      // );
      setSelectedElement(null);
      setSelectedElementName("");
    }
  }, [
    selectedElementKey,
    dataForUpdate,
    isMainContentOpen,
    selectedElementName,
  ]);

  useEffect(() => {
    console.log("documentationData", documentationData);
  }, [documentationData]);

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

  // useEffect(() => {
  //   if (selectedElement) {
  //     setIsIndexOpen(false);
  //   }
  // }, [selectedElement]);

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
        };
      });
    }
  }, [documentationTitle, isWip]);

  function closePopup() {
    setIsToastOpen(false);
  }

  return (
    <div className={"container"}>
      <BuilderContext.Provider
        value={{
          selectedElement,
          setSelectedElement,
          selectedSections,
          setSelectedSections,
          selectedElementName,
          setSelectedElementName,
          selectedCard,
          setSelectedCard,
          loggedInUser,
          setLoggedInUser,
          currentUser,
          setCurrentUser,
          currentDocument,
          setCurrentDocument,
          currentPage,
          setCurrentPage,
          documentationData,
          setDocumentationData,
          documentationTitle,
          setDocumentationTitle,
          isWip,
          setIsWip,
          isBuilding,
          setIsBuilding,
          selectedElementKey,
          setSelectedElementKey,
          token,
          isLoading,
          setIsLoading,
          isScroll,
          isMainContentOpen,
          setIsMainContentOpen,
          isIndexOpen,
          setIsIndexOpen,
          isFromSavedData,
          setIsFromSavedData,
          isContenFromServerOpen,
          setIsContenFromServerOpen,
          isLoginPageOpen,
          isReset,
          setIsReset,
          showResetPopup,
          setShowResetPopup,
          showCancelPopup,
          setShowCancelPopup,
          setDataForUpdate,
        }}
      >
        {feedbackPage && (
          <FeedbackPopup
            show={feedbackPage}
            setShow={setFeedbackPage}
            user={currentUser}
          />
        )}
        {isLoading && <LoaderPage />}
        {showCancelPopup && <CancelPopup />}
        {showResetPopup && <ResetPopup />}
        {isToastOpen && (
          <Toast
            message={`Documentation for this element already exists in: \n${
              //@ts-ignore
              foundDocumentation.title
            }`}
            onClose={closePopup}
          />
        )}
        {!token && (
          <Login
            setToken={setToken}
            setIsLoginFailed={setIsLoginFailed}
            isLoginFailed={isLoginFailed}
            setIsLoginPageOpen={setIsLoginPageOpen}
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

        {/* on startup */}
        {!isLoginPageOpen && isFirstTime && !isMainContentOpen && (
          <IndexPage
            data={dataForUpdate}
            setSelectedMasterId={setSelectedMasterId}
            setIsIndexOpen={setIsIndexOpen}
            setIsContenFromServerOpen={setIsContenFromServerOpen}
            setIsFromSavedData={setIsFromSavedData}
          />
        )}
        {/* {isFirstTime && selectedElement && <MainContent />} */}

        {/* not on startup */}
        {!isLoginPageOpen && !isFirstTime && isIndexOpen && (
          <IndexPage
            data={dataForUpdate}
            setSelectedMasterId={setSelectedMasterId}
            setIsIndexOpen={setIsIndexOpen}
            setIsContenFromServerOpen={setIsContenFromServerOpen}
            setIsFromSavedData={setIsFromSavedData}
          />
        )}
        {isMainContentOpen && <MainContent />}
        {selectedMasterId &&
          !isMainContentOpen &&
          isContenFromServerOpen &&
          !isLoginPageOpen && (
            <ContentFromServer
              data={dataForUpdate}
              selectedMasterId={selectedMasterId}
            />
          )}

        {/* login */}
        {!isLoginPageOpen && !isIndexOpen && (
          <Footer
            setShowCancelPopup={setShowCancelPopup}
            setIsBuilding={setIsBuilding}
            isBuilding={isBuilding}
            documentationData={documentationData}
          />
        )}
      </BuilderContext.Provider>
    </div>
  );
}

export default render(Plugin);
