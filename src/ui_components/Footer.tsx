import { h } from "preact";
import { FunctionComponent } from "preact";
import { IconReload } from "@tabler/icons-react";

const Footer = ({
  setShowCancelPopup,
  setShowResetPopup,
}: {
  setShowCancelPopup: Function;
  setShowResetPopup: Function;
}) => {
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
          className={"primary"}
          onClick={() => console.log("to be create")}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Footer;
