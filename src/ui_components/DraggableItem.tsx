import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";

interface DraggableItemProps {
  id: string;
  onMove?: (draggedId: string, targetId: string) => void;
  content: any;
  data?: any;
  index?: number;
}

export const DraggableItem: FunctionComponent<DraggableItemProps> = ({
  id,
  onMove,
  content,
  data,
  index,
}) => {
  const [dragging, setDragging] = useState(false);
  const handleDragStart = (e: DragEvent) => {
    setDragging(true);
    e.dataTransfer!.setData("text/plain", id);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (typeof onMove === "function") {
      onMove(e.dataTransfer!.getData("text/plain"), id);
    }
  };

  useEffect(() => {
    const handleDragEnter = (e: Event) => {
      e.preventDefault();
    };

    const handleDragLeave = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("dragenter", handleDragEnter);
    document.addEventListener("dragleave", handleDragLeave);

    return () => {
      document.removeEventListener("dragenter", handleDragEnter);
      document.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

  return (
    <div
      className={"drag-item"}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => console.log("data.id", data.id)}
      style={{
        opacity: dragging ? 0.5 : 1,
        display: "inline-block",
        height: "fit-content",
        // pointerEvents: "none",
      }}
    >
      {content(data, index)}
    </div>
  );
};
