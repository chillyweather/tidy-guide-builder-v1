/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck
import { h } from "preact";
import { useEffect } from "preact/hooks";
import Sortable from "sortablejs";
import { DraggableItem } from "./DraggableItem";
import { ContentCard } from "./ContentCard";

export const DraggableCardList = ({
  items,
  setItems,
}: {
  items: any[] | undefined;
  setItems: any;
}) => {
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
        animation: 150,
        handle: ".dragIcon",
      });
    }
  }, []);

  const ListOfCards = (items: any[]) => {
    return items.map((item, index) => {
      // console.log("item", item);
      return (
        <DraggableItem
          key={item.docId}
          id={item.id} //! delete this later
          docId={item.docId}
          content={ContentCard}
          index={index}
          data={item}
        />
      );
    });
  };

  return <div id={"sections"}>{ListOfCards(items)}</div>;
};

export default DraggableCardList;
