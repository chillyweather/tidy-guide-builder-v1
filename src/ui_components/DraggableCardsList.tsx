//@ts-nocheck
import { h, FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import Sortable from "sortablejs";
import { DraggableItem } from "./DraggableItem";
import { ContentCard } from "./ContentCard";

interface DraggableCardListProps {}

export const DraggableCardList: FunctionComponent<
  DraggableCardListProps
> = () => {
  const items = useContext(BuilderContext)?.selectedSections;
  const setItems = useContext(BuilderContext)?.setSelectedSections;

  useEffect(() => {
    const el = document.getElementById("sections");
    if (el) {
      Sortable.create(el, {
        onEnd: (evt) => {
          setItems((prevItems) => {
            const newItems = Array.from(prevItems);
            const itemMoving = newItems.splice(evt.oldIndex, 1)[0];
            newItems.splice(evt.newIndex, 0, itemMoving);
            return newItems;
          });
        },
      });
    }
  }, []);

  const ListOfCards = (items: any[]) => {
    return items.map((item, index) => (
      <DraggableItem
        key={item.id}
        id={item.id}
        content={ContentCard}
        data={item}
      />
    ));
  };

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
      {ListOfCards(items)}
    </div>
  );
};

export default DraggableCardList;
