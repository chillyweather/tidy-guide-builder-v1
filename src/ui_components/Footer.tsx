import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import {
  IconReload,
  IconChevronDown,
  Icon3dCubeSphere,
} from "@tabler/icons-react";

const Footer = ({
  setIsBuilding,
  setIsBuildingOnCanvas,
}: {
  setIsBuilding: Function;
  setIsBuildingOnCanvas: Function;
}) => {
  const [saveData, setSaveData] = useState(false);
  const [isPublishDropdownOpen, setIsPublishDropdownOpen] = useState(false);

  const {
    documentationTitle,
    selectedElementKey,
    selectedElementName,
    setShowResetPopup,
    setIsDraft,
    isDraft,
  } = useContext(BuilderContext) || {};

  const isValid =
    !!documentationTitle?.length &&
    !!selectedElementKey?.length &&
    !!selectedElementName?.length;

  function PublishButtonDropdown() {
    return (
      <div
        className={"feedbackPopupBackground invisible"}
        onClick={() => {
          setIsPublishDropdownOpen(false);
        }}
      >
        <div className={"publish-dropdown"}>
          <div
            className={"publish-dropdown-item"}
            onClick={() => {
              setIsBuilding(true);
              setIsBuildingOnCanvas(true);
              setIsPublishDropdownOpen(false);
            }}
          >
            <div className="publish-content-wrapper">
              <h4>Build on Canvas</h4>
              <p>Build on Canvas and publish to Tidy Viewer</p>
            </div>
            <Icon3dCubeSphere className={"hideMe"} />
          </div>
          <div className="divider"></div>
          <div
            className={"publish-dropdown-item"}
            onClick={() => {
              setIsBuildingOnCanvas(false);
              setIsBuilding(true);
              setIsPublishDropdownOpen(false);
            }}
          >
            <div className={"publish-content-wrapper"}>
              <h4>Publish to Viewer</h4>
              <p>Publish to Tidy Viewer</p>
            </div>
            <Icon3dCubeSphere className={"hideMe"} />
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!isValid) {
      setIsPublishDropdownOpen(false);
    }
  }, [isValid, setIsPublishDropdownOpen]);

  useEffect(() => {
    if (isDraft && saveData) {
      setIsBuilding(true);
      setIsBuildingOnCanvas(false);
    }
  }, [isDraft, saveData, setIsBuilding, setIsBuildingOnCanvas]);

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
          disabled
          className={"second"}
          onClick={() => {
            setSaveData(true);
            setIsDraft(true);
          }}
        >
          Save changes
        </button>
        {isPublishDropdownOpen && <PublishButtonDropdown />}
        <div
          className={isValid ? "split" : "split split-disabled"}
          disabled={!isValid}
        >
          <button
            className={isValid ? "primary" : "primary primary-disabled"}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey) {
                setIsBuilding(true);
                setIsBuildingOnCanvas(true);
              } else {
                setIsBuilding(true);
                setIsBuildingOnCanvas(false);
              }
            }}
          >
            Publish
          </button>
          <button
            className={isValid ? "primary" : "primary primary-disabled"}
            onClick={() => {
              setIsPublishDropdownOpen(!isPublishDropdownOpen);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsPublishDropdownOpen(false);
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
