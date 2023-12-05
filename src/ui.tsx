import { render } from "@create-figma-plugin/ui";
import React from "react";

import sectionData from "./resources/sectionData";
import { emit, on, once } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import BuilderContext from "./BuilderContext";
//dependencies
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//new components
import Login from "./ui_components/LoginPage";
import LoggedIn from "./ui_components/LoggedInPage";

//components
// import SectionCard from "./ui_components/SectionCard";

//styles
import EmptyState from "./ui_components/EmptyState";
import Header from "./ui_components/Header";
import "!./styles.css";

function Plugin() {
  //saved token
  const [token, setToken] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //selected element
  // const selectedElementHook = useState<any>(null);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [selectedElementName, setSelectedElementName] = useState("");

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

  //   function buildListOfCards(arr: any[], isAdded: boolean, setArr: any) {
  //     const onDragEnd = (result: any) => {
  //       if (!result.destination) return;
  //       const items = Array.from(arr);
  //       const [reorderedItem] = items.splice(result.source.index, 1);
  //       items.splice(result.destination.index, 0, reorderedItem);
  //       setArr(items); // Update your state with the new order
  //     };
  //
  //     return (
  //       <DragDropContext onDragEnd={onDragEnd}>
  //         <Droppable droppableId="sectionCards">
  //           {(provided) => (
  //             <div {...provided.droppableProps} ref={provided.innerRef}>
  //               {arr.map((section: any, index: number) => (
  //                 <Draggable
  //                   key={index + section.title + section.content}
  //                   draggableId={index + section.title + section.content}
  //                   index={index}
  //                 >
  //                   {(provided) => (
  //                     //@ts-ignore
  //                     <div
  //                       ref={provided.innerRef}
  //                       {...provided.draggableProps}
  //                       {...provided.dragHandleProps}
  //                     >
  //                       //@ts-ignore
  //                       <div>
  //                         <p>Test</p>
  //                       </div>
  //                     </div>
  //                   )}
  //                 </Draggable>
  //               ))}
  //               {provided.placeholder}
  //             </div>
  //           )}
  //         </Droppable>
  //       </DragDropContext>
  //     );
  //   }

  return (
    <div className={"container"}>
      <BuilderContext.Provider value={{ selectedElement, setSelectedElement }}>
        {!token && (
          <Login
            setToken={setToken}
            setIsLoginFailed={setIsLoginFailed}
            isLoginFailed={isLoginFailed}
            setIsLoginPageOpen={setIsLoginPageOpen}
          />
        )}
        <Header setIsLoginOpen={setIsLoginPageOpen} />
        {isLoginPageOpen && token && <LoggedIn setToken={setToken} />}

        {!selectedElement && <EmptyState />}
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
