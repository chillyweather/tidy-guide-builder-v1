import { h } from "preact";
import {
  useContext,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "preact/hooks";

import BuilderContext from "../../BuilderContext";
import {
  IconGripVertical,
  IconChevronDown,
  IconMoodPuzzled,
  IconCopy,
  IconTrash,
  IconEye,
} from "@tabler/icons-react";
import { Toggle, Text } from "@create-figma-plugin/ui";

const TextCard = ({
  data,
  isSelected,
  isDraft,
  setIsDraft,
  index,
  publish,
  setPublish,
}: {
  data: any;
  isSelected: boolean;
  isDraft: boolean;
  setIsDraft: Function;
  index: number;
  publish: boolean;
  setPublish: Function;
}) => {
  const [textContent, setTextContent] = useState("");
  const selectedCard = useContext(BuilderContext)?.selectedCard;
  const setSelectedCard = useContext(BuilderContext)?.setSelectedCard;
  const setSelectedSections = useContext(BuilderContext)?.setSelectedSections;
  const id = data.id;

  function PublishToggle(
    publish: boolean,
    setPublish: Function,
    label: string
  ) {
    function handleChange(event: any) {
      const newValue = event.currentTarget.checked;
      console.log(newValue);
      setPublish(newValue);
    }
    return (
      <Toggle
        onChange={handleChange}
        value={publish}
        style={{ border: "none", cursor: "pointer" }}
        disabled={isDraft}
      >
        <Text>{label}</Text>
      </Toggle>
    );
  }

  const handleOpenSection = (e: MouseEvent) => {
    e.stopPropagation();
    if (selectedCard === id) {
      setSelectedCard("");
    } else {
      setSelectedCard(id);
    }
  };

  const handleDeleteSection = (e: MouseEvent) => {
    e.stopPropagation();
    setSelectedSections((prevSections: any[]) => {
      const newSections = Array.from(prevSections);
      newSections.splice(index, 1);
      return newSections;
    });
  };

  const handleDuplicateSection = (e: MouseEvent) => {
    e.stopPropagation();
    setSelectedSections((prevSections: any[]) => {
      const newSections = Array.from(prevSections);
      const newSection = { ...data };
      newSection.id = Math.random().toString(36).substring(2, 9);
      newSections.splice(index + 1, 0, newSection);
      return newSections;
    });
  };

  return (
    <div className={isDraft ? "sectionCard draft" : "sectionCard"}>
      <div className="cardHeader">
        <div className="leftContent">
          <IconGripVertical />
          <IconMoodPuzzled style={{ color: "burntorange" }} />
          <div className={"sectionTitle"} contentEditable>
            Paragraph
          </div>
        </div>
        <div className="rightContent">
          <button className={"cardAuxButton"} onClick={handleOpenSection}>
            <IconChevronDown />
          </button>
        </div>
      </div>
      {isSelected && (
        <div className="cardBody">
          <textarea
            className="cardTextArea"
            rows={15}
            maxLength={1000}
            placeholder="Type here..."
            value={textContent}
            onInput={(e) => setTextContent(e.currentTarget.value)}
          />
          <div className="textSymbolsCounterRow">
            <div className="textSymbolsCounter">{textContent.length}/1000</div>
          </div>
          <div className="cardFooter">
            <div className="leftContent">
              {PublishToggle(publish, setPublish, "Publish to Tidy Viewer")}
            </div>
            <div className="rightContent">
              <button
                className={"cardAuxButton"}
                onClick={() => setIsDraft(!isDraft)}
              >
                <IconEye />
              </button>
              <button
                className={"cardAuxButton"}
                onClick={handleDuplicateSection}
              >
                <IconCopy />
              </button>
              <button className={"cardAuxButton"} onClick={handleDeleteSection}>
                <IconTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextCard;
