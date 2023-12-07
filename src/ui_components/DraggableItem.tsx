import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";

interface DraggableItemProps {
  id: number;
  onMove?: (draggedId: string, targetId: number) => void;
  content: any;
  data?: any;
}
export const DraggableItem: FunctionComponent<DraggableItemProps> = ({
  id,
  onMove,
  content,
  data,
}) => {
  console.log("data, id", data.title, id);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e: DragEvent) => {
    setDragging(true);
    e.dataTransfer!.setData("text/plain", id.toString());
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
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        opacity: dragging ? 0.5 : 1,
        cursor: "move",
        padding: 10,
        backgroundColor: "white",
      }}
    >
      {content(data)}
    </div>
  );
};
