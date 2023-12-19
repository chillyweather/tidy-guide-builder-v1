import { h } from "preact";
import { useState, useContext, useEffect } from "preact/hooks";
import BuilderContext from "../../BuilderContext";
import CheckboxElement from "../Checkbox";

const HeaderCard = ({ data }: { data: any }) => {
  const setDocumentationData = useContext(BuilderContext)?.setDocumentationData;
  const documentationTitle = useContext(BuilderContext)?.documentationTitle;
  const setDocumentationTitle =
    useContext(BuilderContext)?.setDocumentationTitle;
  const isWip = useContext(BuilderContext)?.isWip;
  const setIsWip = useContext(BuilderContext)?.setIsWip;

  const handleValueChange = (newValue: boolean) => {
    console.log("newValue", newValue);
    setIsWip(newValue);
  };

  useEffect(() => {
    setDocumentationData((prevDocumentation: any) => {
      const newDocumentation = { ...prevDocumentation };
      newDocumentation.title = documentationTitle;
      newDocumentation.wip = isWip;
      return newDocumentation;
    });
  }, [documentationTitle, isWip]);

  return (
    <div className="cardHeader" id="headerCard">
      <input
        className={"sectionTitle"}
        id={"docName"}
        type={"text"}
        value={documentationTitle}
        placeholder={"Untitled"}
        onInput={(e) => setDocumentationTitle(e.currentTarget.value)}
      />

      <CheckboxElement
        value={isWip!}
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
