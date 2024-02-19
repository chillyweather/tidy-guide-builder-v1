import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "src/BuilderContext";

const Settings = ({ }: {}) => {
  const { setShowDeleteAccountPopup } = useContext(BuilderContext) || {};
  return (
    <div className={"delete-wrapper"}>
      <div className="delete-flex">
        <div className="delete-content">
          <h4>Delete Account</h4>
          <p>Once you delete an account, there is no going back. <br/>Please be certain.</p>
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
