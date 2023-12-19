import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { FunctionComponent } from "preact";
import { IconReload } from "@tabler/icons-react";

const Footer = ({
  setShowCancelPopup,
  setShowResetPopup,
  setIsBuilding,
}: {
  setShowCancelPopup: Function;
  setShowResetPopup: Function;
  setIsBuilding: Function;
}) => {
  const documentationTitle = useContext(BuilderContext)?.documentationTitle;
  const selectedElementKey = useContext(BuilderContext)?.selectedElementKey;
  const isValid = !!documentationTitle?.length && !!selectedElementKey?.length;

  return (
    <div className={"footer"}>
      <div className="leftFooterContent">
        <button className={"flex-btn"} onClick={() => setShowResetPopup(true)}>
          <IconReload />
          Reset
        </button>
      </div>
      <div className="rightFooterContent">
        <button className={"second"} onClick={() => setShowCancelPopup(true)}>
          Cancel
        </button>
        <button
          className={isValid ? "primary" : "primary primary-disabled"}
          onClick={() => setIsBuilding(true)}
          disabled={!isValid}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Footer;
