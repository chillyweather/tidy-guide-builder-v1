import { h } from "preact";
import { useState } from "preact/hooks";
import CheckboxElement from "../Checkbox";

const HeaderCard = ({
  data,
  isSelected,
  setSelectedCard,
}: {
  data: any;
  isSelected: boolean;
  setSelectedCard: Function;
}) => {
  const [isWip, setIsWip] = useState(false);

  const handleValueChange = (newValue: boolean) => {
    console.log(newValue);
    setIsWip(newValue);
  };

  return (
    <div
      className={isSelected ? "sectionCard selected" : "sectionCard"}
      onClick={() => {
        setSelectedCard(data.id);
      }}
      id="headerCard"
    >
      <div className="topContentWrapper">
        <div className={"sectionTitle"} contentEditable>
          {data.title}
        </div>
        <CheckboxElement
          value={isWip}
          setValue={handleValueChange}
          label="Work in progress"
        />
      </div>
    </div>
  );
};

export default HeaderCard;
