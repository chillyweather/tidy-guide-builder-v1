import { h } from "preact";
import { IconX, IconPlus } from "@tabler/icons-react";

const ListCard = ({
  listItems,
  setListItems,
}: {
  listItems: any[];
  setListItems: Function;
}) => {
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
  return (
    <div className={"listCardContentStyle"}>
      <div className={"listInputColumnStyle"}>
        {listItems.map((value: string, index: number) => (
          <div key={index} className={"listCollumnStyle"}>
            <div className="inputInputRowStyle">
              <input
                type="text"
                value={value}
                onInput={(e) => handleInputChange(index, e)}
                className={"listInputStyle"}
                placeholder={"List item " + (index + 1)}
              />
              <button onClick={() => deleteInputField(index)}>
                <IconX />
              </button>
            </div>
            {index === listItems.length - 1 && (
              <button onClick={addInputField} className={"listButtonStyle"}>
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
