import { h } from "preact";
import LinkBlock from "../LinkBlock";
import { IconPlus } from "@tabler/icons-react";

const LinkCard = ({
  sources,
  setSources,
}: {
  sources: any[];
  setSources: Function;
}) => {
  const addSource = () => {
    setSources([...sources, { source: "", link: "" }]);
  };

  return (
    <div className={"linkBlockColumn"}>
      {LinkBlock(sources, setSources)}
      <button onClick={addSource} className={"addLink"}>
        <IconPlus />
      </button>
    </div>
  );
};

export default LinkCard;
