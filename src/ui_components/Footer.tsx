import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import {
  IconReload,
  IconChevronDown,
  Icon3dCubeSphere,
} from "@tabler/icons-react";
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
  const [isPublisDropdownOpen, setIsPublisDropdownOpen] = useState(false);
  const documentationTitle = useContext(BuilderContext)?.documentationTitle;
  const selectedElementKey = useContext(BuilderContext)?.selectedElementKey;
  const isValid = !!documentationTitle?.length && !!selectedElementKey?.length;
  const setShowResetPopup = useContext(BuilderContext)?.setShowResetPopup;
  const setIsDraft = useContext(BuilderContext)?.setIsDraft;

  function PublishButtonDropdown() {
    return (
      <div className={"publish-dropdown"}>
        <div
          className={"publish-dropdown-item"}
          onClick={() => {
            console.log("Build & Publish to viewer");
            setIsPublisDropdownOpen(false);
          }}
        >
          <div className="publish-content-wrapper">
            <h2>Build on canvas</h2>
            <p>Publish to Tidy Viewer and Build on Canvas</p>
          </div>
          <Icon3dCubeSphere />
        </div>
        <div className="divider"></div>
        <div
          className={"publish-dropdown-item"}
          onClick={() => {
            console.log("Publish to viewer");
            setIsPublisDropdownOpen(false);
          }}
        >
          <div className={"publish-content-wrapper"}>
            <h2>Publish to viewer</h2>
            <p>Publish to Tidy Viewer</p>
          </div>
          <Icon3dCubeSphere />
        </div>
      </div>
    );
  }

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
        {isPublisDropdownOpen && <PublishButtonDropdown />}
        <div
          className={isValid ? "split" : "split split-disabled"}
          disabled={!isValid}
        >
          <button
            className={isValid ? "primary" : "primary primary-disabled"}
            onClick={() => {
              {
                setIsBuilding(true);
                setIsBuildingOnCanvas(false);
              }
            }}
          >
            Publish
          </button>
          <button
            className={"primary"}
            onClick={() => {
              setIsPublisDropdownOpen(!isPublisDropdownOpen);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsPublisDropdownOpen(false);
            }}
          >
            <IconChevronDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
