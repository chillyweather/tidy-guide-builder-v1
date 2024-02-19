import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "src/BuilderContext";

const Settings = ({}: {}) => {
  const { setShowDeleteAccountPopup } = useContext(BuilderContext) || {};
  return (
    <div className={"delete-wrapper"}>
      <div className="login">
      <button
        id={"delete-button"}
        className={"button primary"}
        onClick={setShowDeleteAccountPopup}
      >
        Delete account
      </button>
      </div>
    </div>
  );
};

export default Settings;
