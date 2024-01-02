import { h } from "preact";
import { useContext, useEffect } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { IconReload, IconChevronDown } from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import {
  getDocumentations,
  updateDocumentation,
  createDocumentation,
} from "./ui_functions/documentationHandlers";

const Footer = ({
  setIsBuilding,
  setIsBuildingOnCanvas,
}: {
  setIsBuilding: Function;
  setIsBuildingOnCanvas: Function;
}) => {
  const documentationTitle = useContext(BuilderContext)?.documentationTitle;
  const selectedElementKey = useContext(BuilderContext)?.selectedElementKey;
  const isValid = !!documentationTitle?.length && !!selectedElementKey?.length;
  const setShowResetPopup = useContext(BuilderContext)?.setShowResetPopup;
  const setIsDraft = useContext(BuilderContext)?.setIsDraft;

  return (
    <div className={"footer"}>
      <div className="leftFooterContent">
        <button className={"flex-btn"} onClick={() => setShowResetPopup(true)}>
          <IconReload />
          Reset
        </button>
      </div>
      <div className="rightFooterContent">
        <button
          className={"second"}
          onClick={() => {
            setIsDraft(true);
            setIsBuilding(true);
          }}
        >
          Save changes
        </button>
        <div
          className={isValid ? "split" : "split split-disabled"}
          disabled={!isValid}
        >
          <button
            className={isValid ? "primary" : "primary primary-disabled"}
            onClick={() => {
              setIsBuilding(true);
              setIsBuildingOnCanvas(true);
            }}
          >
            Publish
          </button>
          <button className={"primary"}>
            <IconChevronDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
