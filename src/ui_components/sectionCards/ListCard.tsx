import { IconX, IconPlus } from "@tabler/icons-react";
import { h, FunctionComponent } from "preact";
import { useRef, useEffect, useContext } from "preact/hooks";
import BuilderContext from "../../BuilderContext";

interface ListCardProps {
  listItems: any[];
  setListItems: Function;
}

const ListCard: FunctionComponent<ListCardProps> = ({
  listItems,
  setListItems,
}) => {
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const addInputField = () => {
    setListItems([...listItems, ""]);
  };

  const deleteInputField = (index: number) => {
    const newInputs = [...listItems];
    newInputs.splice(index, 1);
    setListItems(newInputs);
  };

  const handleInputChange = (index: number, event: Event) => {
    const newInputs = [...listItems];
    newInputs[index] = (event.target as HTMLInputElement).value;
    setListItems(newInputs);
  };

  useEffect(() => {
    if (addButtonRef.current && document.activeElement?.tagName !== "INPUT") {
      addButtonRef.current.focus();
    }
  }, [listItems]);

  return (
    <div className="listCardContentStyle">
      <div className="listInputColumnStyle">
        {listItems.map((value: string, index: number) => (
          <div key={index} className="listCollumnStyle">
            <div className="inputInputRowStyle">
              <input
                type="text"
                value={value}
                onInput={(e) => handleInputChange(index, e)}
                // onKeyDown={(e) => {
                //   e.key === "Enter" && addInputField();
                // }}
                className="listInputStyle"
                placeholder="Enter text..."
              />
              <button onClick={() => deleteInputField(index)}>
                <IconX />
              </button>
            </div>
            {index === listItems.length - 1 && (
              <button
                ref={addButtonRef}
                onClick={addInputField}
                className="listButtonStyle"
              >
                <IconPlus />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCard;
