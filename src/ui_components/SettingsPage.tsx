import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { IconAlertCircleFilled } from "@tabler/icons-react";

const Settings = ({ }: {}) => {
  const { setShowDeleteAccountPopup } = useContext(BuilderContext) || {};
  return (
    <div className={"delete-wrapper"}>
      <div className="delete-flex">
        <div className="delete-content">
          <div className="title-flex">
            <IconAlertCircleFilled className={"red-icon icon-16"} />
            <h4>Delete Account</h4>
          </div>
          <p>Once you delete an account, there is no going back. <br />Please be certain.</p>
        </div>
        <button
          id={"delete-button"}
          className={"button primary"}
          onClick={setShowDeleteAccountPopup}
        >
          Delete this account
        </button>
      </div>
    </div>
  );
};

export default Settings;
