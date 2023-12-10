import { render } from "@create-figma-plugin/ui";

import sectionData from "./resources/sectionData";
import { emit, on, once } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import BuilderContext from "./BuilderContext";
//dependencies

//new components
import Login from "./ui_components/LoginPage";
import LoggedIn from "./ui_components/LoggedInPage";
import MainContent from "./ui_components/MainContent";
import Header from "./ui_components/Header";
import Footer from "./ui_components/Footer";

//components
// import SectionCard from "./ui_components/SectionCard";

//styles
import EmptyState from "./ui_components/EmptyState";
import "!./styles.css";

function Plugin() {
  //saved token
  const [token, setToken] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //selected element
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [selectedElementName, setSelectedElementName] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>("");

  //selected cards
  const [selectedSections, setSelectedSections] = useState<any[]>([
    sectionData[0],
  ]);

  console.log("selectedSections :>> ", selectedSections);

  //page states
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);

  on("AUTH_CHANGE", (token) => {
    if (token) {
      setToken(token);
    }
  });

  on("SELECTION", ({ defaultNode, name }) => {
    setSelectedElement(defaultNode);
    setSelectedElementName(name);
  });

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
        }}
      >
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
        />
        {isLoginPageOpen && token && <LoggedIn setToken={setToken} />}
        {!selectedElement && <EmptyState />}
        {selectedElement && !isLoginPageOpen && <MainContent />}
        {selectedElement && !isLoginPageOpen && <Footer />}
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
