import { render } from "@create-figma-plugin/ui";

import sectionData from "./resources/sectionData";
import { emit, on, once } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useEffect, useState, useContext } from "preact/hooks";
import BuilderContext from "./BuilderContext";
import FeedbackPopup from "./ui_components/popups/feedbackPopup";
import CancelPopup from "./ui_components/popups/cancelPopup";
import ResetPopup from "./ui_components/popups/resetPopup";
//dependencies

//new components
import Login from "./ui_components/LoginPage";
import LoggedIn from "./ui_components/LoggedInPage";
import MainContent from "./ui_components/MainContent";
import Header from "./ui_components/Header";
import Footer from "./ui_components/Footer";
import LoaderPage from "./ui_components/LoadingPage";
import IndexPage from "./ui_components/IndexPage";
import { getDocumentations } from "./ui_components/ui_functions/documentationHandlers";

//styles
import EmptyState from "./ui_components/EmptyState";
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
  const [isLoading, setIsLoading] = useState(false);

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
  const [documentationData, setDocumentationData] = useState<any>({});

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

  //page navigation
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [isMainContentOpen, setIsMainContentOpen] = useState(false);

  on("AUTH_CHANGE", async (token) => {
    if (token) {
      setToken(token);
      const data = await getDocumentations(token);
      setDataForUpdate(data);
    }
  });

  on("SELECTION", ({ defaultNode, name, key }) => {
    if (defaultNode) setIsMainContentOpen(true);
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
    if (isMainContentOpen) {
      setIsFirstTime(false);
    }
  }, [isMainContentOpen]);

  return (
    <div className={"container"}>
      <BuilderContext.Provider
        value={{
          selectedElement,
          setSelectedElement,
          selectedSections,
          setSelectedSections,
          selectedElementName,
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
        {showCancelPopup && (
          <CancelPopup show={showCancelPopup} setShow={setShowCancelPopup} />
        )}
        {showResetPopup && (
          <ResetPopup show={showResetPopup} setShow={setShowResetPopup} />
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
        />
        {isLoginPageOpen && token && <LoggedIn setToken={setToken} />}
        {(!selectedElement || !isFirstTime) && isIndexOpen && (
          <IndexPage
            data={dataForUpdate}
            setSelectedMasterId={setSelectedMasterId}
            setIsIndexOpen={setIsIndexOpen}
          />
        )}
        {!selectedElement && !isIndexOpen && <EmptyState />}
        {isMainContentOpen && <MainContent />}
        {selectedElement && !isLoginPageOpen && !isIndexOpen && (
          <Footer
            setShowCancelPopup={setShowCancelPopup}
            setShowResetPopup={setShowResetPopup}
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
