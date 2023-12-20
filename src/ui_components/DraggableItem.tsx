import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";

interface DraggableItemProps {
  id: string;
  onMove?: (draggedId: string, targetId: string) => void;
  content: any;
  data?: any;
  index?: number;
  initialItems?: any[];
}

export const DraggableItem: FunctionComponent<DraggableItemProps> = ({
  id,
  onMove,
  content,
  data,
  index,
  initialItems,
}) => {
  const [dragging, setDragging] = useState(false);
  const handleDragStart = (e: DragEvent) => {
    setDragging(true);
    e.dataTransfer!.setData("text/plain", id);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };
  //
  //   const handleDragOver = (e: DragEvent) => {
  //     e.preventDefault();
  //   };
  //
  //   const handleDrop = (e: DragEvent) => {
  //     e.preventDefault();
  //     if (typeof onMove === "function") {
  //       onMove(e.dataTransfer!.getData("text/plain"), id);
  //     }
  //   };

  //   useEffect(() => {
  //     const handleDragEnter = (e: Event) => {
  //       e.preventDefault();
  //     };
  //
  //     const handleDragLeave = (e: Event) => {
  //       e.preventDefault();
  //     };
  //
  //     document.addEventListener("dragenter", handleDragEnter);
  //     document.addEventListener("dragleave", handleDragLeave);
  //
  //     return () => {
  //       document.removeEventListener("dragenter", handleDragEnter);
  //       document.removeEventListener("dragleave", handleDragLeave);
  //     };
  //   }, []);

  return (
    <div
      className={"drag-item"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // onDragOver={handleDragOver}
      // onDrop={handleDrop}
      style={{
        opacity: dragging ? 0.5 : 1,
        display: "inline-block",
        height: "fit-content",
      }}
    >
      {content(data, index, initialItems)}
    </div>
  );
};
