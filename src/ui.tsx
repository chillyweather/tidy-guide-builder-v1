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

  on("AUTH_CHANGE", (token) => {
    if (token) {
      setToken(token);
    }
  });

  on("SELECTION", ({ defaultNode, name, key }) => {
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

  function bodyScroll() {
    document.body.onscroll = function () {
      if (document.body.scrollTop == 0) {
        document.getElementById("selectedName")?.classList.add("hidden");
      } else {
        document.getElementById("selectedName")?.classList.remove("hidden");
      }
    };
  }

  function syncContent() {
    setTimeout(function () {
      const docNameInput = document.getElementById(
        "docName"
      ) as HTMLInputElement;
      document.getElementById("docs")!.innerText = docNameInput.value;
      // console.log("____________________________");
      // console.log(document.getElementById("docName"));
      syncContent();
    }, 150);
  }
  bodyScroll();
  syncContent();

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
        />
        {isLoginPageOpen && token && <LoggedIn setToken={setToken} />}
        {!selectedElement && <EmptyState />}
        {!isLoading && selectedElement && !isLoginPageOpen && <MainContent />}
        {selectedElement && !isLoginPageOpen && (
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

//! build documentation on canvas
//   useEffect(() => {
//     const cardsLength = selectedSections.length;
//     const propsLength = Object.keys(documentationData).length;
//     if (
//       selectedElement &&
//       buildPage &&
//       Object.keys(documentationData).length > 0 &&
//       propsLength === cardsLength
//     ) {
//       const elementId = selectedElement.id;
//       documentationData[0].docId = docId;
//       emit("BUILD", documentationData, elementId);
//     }
//   }, [documentationData, buildPage, selectedElement]);
//
//   //! send data to db
//   useEffect(() => {
//     if (Object.keys(dataForUpdate).length > 0) {
//       handleDocumentation(token, dataForUpdate);
//     }
//   }, [dataForUpdate]);

// async function handleDocumentation(token: string, data: any) {
//   const id = Object.values(data)[0];
//   if (typeof id !== "string") return;
//   setIsLoading(true);
//   const result = await getDocumentations(token);
//   const isDocumented = result.some((doc: any) => doc._id === id);
//   if (isDocumented) {
//     await updateDocumentation(token, id, data);
//   } else {
//     await createDocumentation(token, data);
//   }
//   setIsLoading(false);
//   emit("CLOSE");
// }
