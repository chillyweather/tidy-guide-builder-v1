import { h } from "preact";
import { useState } from "preact/hooks";
// import { DndProvider, useDrop } from "preact-dnd";
import { useDrag } from "preact-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const testArr = [
  {
    title: "Header",
    content: "header",
    data: [],
    repeatable: false,
  },
  {
    title: "Property",
    content: "element",
    data: [],
  },
  {
    title: "Variants",
    content: "element",
    data: [],
  },
  {
    title: "Text",
    content: "text",
    data: [],
  },
  {
    title: "Two Columns (Do's and Don'ts)",
    content: "two-columns",
    data: [],
  },
  {
    title: "List",
    content: "list",
    data: [],
  },
  {
    title: "Link",
    content: "link",
    data: [],
  },
  {
    title: "Image",
    content: "image",
    data: [],
  },
  {
    title: "Video",
    content: "video",
    data: [],
  },
  {
    title: "Release Notes",
    content: "release-notes",
    data: [],
  },
];

function buildListOfCards(arr: any[], isAdded: boolean, setArr: any) {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(arr);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setArr(items); // Update your state with the new order
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sectionCards">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {arr.map((section: any, index: number) => (
              <Draggable
                key={index + section.title + section.content}
                draggableId={index + section.title + section.content}
                index={index}
              >
                {(provided) => (
                  //@ts-ignore
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    //@ts-ignore
                    <div>
                      <p>Test</p>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const MainContent = () => {
  const [arr, setArr] = useState(testArr);
  return (
    <div className="mainContent">{buildListOfCards(arr, true, setArr)}</div>
  );
};

export default MainContent;
