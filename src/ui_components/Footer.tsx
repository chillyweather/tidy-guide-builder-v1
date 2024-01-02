import { h } from "preact";
import { useContext, useEffect } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { IconReload } from "@tabler/icons-react";

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
        <button
          className={isValid ? "primary" : "primary primary-disabled"}
          onClick={() => {
            setIsBuilding(true);
            setIsBuildingOnCanvas(true);
          }}
          disabled={!isValid}
        >
          Publish & Build
        </button>
      </div>
    </div>
  );
};

export default Footer;
