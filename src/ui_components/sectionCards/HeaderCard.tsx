import { h } from "preact";
import { useState } from "preact/hooks";
import CheckboxElement from "../Checkbox";

const HeaderCard = ({ data }: { data: any }) => {
  const [isWip, setIsWip] = useState(false);

  const handleValueChange = (newValue: boolean) => {
    console.log(newValue);
    setIsWip(newValue);
  };

  return (
    <div className="cardHeader" id="headerCard">
      <div
        className={"sectionTitle"}
        contentEditable
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {data.title}
      </div>

      <CheckboxElement
        value={isWip}
        setValue={handleValueChange}
        label="Work in progress"
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
        }}
      />
    </div>
  );
};

export default HeaderCard;
