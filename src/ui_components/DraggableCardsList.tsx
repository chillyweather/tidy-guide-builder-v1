//@ts-nocheck
import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import Sortable from "sortablejs";

interface DraggableItemProps {
  id: number;
  onMove?: (draggedId: string, targetId: number) => void;
}

const DraggableItem: FunctionComponent<DraggableItemProps> = ({
  id,
  onMove,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e: DragEvent) => {
    setDragging(true);
    e.dataTransfer.setData("text/plain", id.toString());
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
      onMove(e.dataTransfer.getData("text/plain"), id);
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
      Item {id}
    </div>
  );
};

export const DraggableCardList: FunctionComponent = () => {
  const [items, setItems] = useState<number[]>([0, 1, 2, 3, 4]);

  useEffect(() => {
    const el = document.getElementById("sections");
    if (el) {
      Sortable.create(el, {
        onEnd: (evt) => {
          setItems((prevItems) => {
            const newItems = [...prevItems];
            const itemMoving = newItems.splice(evt.oldIndex, 1)[0];
            newItems.splice(evt.newIndex, 0, itemMoving);
            return newItems;
          });
        },
      });
    }
  }, []);

  return (
    <div
      id={"sections"}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "12px",
      }}
    >
      {items.map((id) => (
        <DraggableItem key={id} id={id} />
      ))}
    </div>
  );
};

export default DraggableCardList;
