import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";

interface DraggableItemProps {
  id: string; //! delete this later
  docId: string;
  onMove?: (draggedId: string, targetId: string) => void;
  content: any;
  data?: any;
  index?: number;
}

export const DraggableItem: FunctionComponent<DraggableItemProps> = ({
  id, //! delete this later
  docId,
  onMove,
  content,
  data,
  index,
}) => {
  const [dragging, setDragging] = useState(false);
  const handleDragStart = (e: DragEvent) => {
    setDragging(true);
    e.dataTransfer!.setData("text/plain", docId);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

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
      {content(data, index)}
    </div>
  );
};
