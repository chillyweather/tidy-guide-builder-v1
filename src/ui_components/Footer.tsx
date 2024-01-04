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
  const [isPublishDropdownOpen, setIsPublishDropdownOpen] = useState(false);
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
            setIsBuilding(true);
            setIsBuildingOnCanvas(true);
            setIsPublishDropdownOpen(false);
          }}
        >
          <div className="publish-content-wrapper">
            <h4>Build on Canvas</h4>
            <p>Build on Canvas and publish to Tidy Viewer</p>
          </div>
          <Icon3dCubeSphere />
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
          <Icon3dCubeSphere />
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!isValid) {
      setIsPublishDropdownOpen(false);
    }
  }, [isValid, setIsPublishDropdownOpen]);

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
            setIsDraft(true);
            setIsBuilding(true);
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
