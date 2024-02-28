import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "../../BuilderContext";
import Spinner from "../../images/loader-spinner-white.png";
import {
  getMyAccountData,
  deleteAccount,
} from "../ui_functions/authentication";
import { emit } from "@create-figma-plugin/utilities";
import { handleDeleteAccount } from "../ui_functions/deleteHandlers";

function DeleteAccountPopup({
  setShowDeleteAccountPopup,
  setIsSettingsPageOpen,
  setIsLoginPageOpen,
}: {
  setShowDeleteAccountPopup: Function;
  setIsSettingsPageOpen: Function;
  setIsLoginPageOpen: Function;
}) {
  const [spinner, setSpinner] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const { token, setToken, loggedInUser } = useContext(BuilderContext) || {};
  return (
    <div
      className={"feedbackPopupBackground"}
      id={"deletePopup"}
      onClick={() => setShowDeleteAccountPopup(false)}
      tabIndex={0}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowDeleteAccountPopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Last chance to keep saving.</h2>
        <p className={"deletePara"}>
          Are you sure you want to proceed?
          <br />
          Deleting your account will result in the loss of all your data and
          settings.
        </p>
        <label className={"dialogLabel"}>
          <input
            className={"dialogInput deleteInput"}
            type="text"
            value={deleteConfirmation}
            placeholder={"Type 'DELETE' to confirm"}
            //@ts-ignore
            onInput={(e) => setDeleteConfirmation(e.target.value)}
          />
        </label>
        <p style={{ color: "#DB3B21" }}>Warning: This action is irreversible.</p>
        <div className="popupButtons footer">
          <button
            className={"button"}
            id={"cancel-button"}
            onClick={() => {
              setShowDeleteAccountPopup(false);
            }}
          >
            Cancel
          </button>
          <button
            className={spinner ? "button primary spinner" : "button primary"}
            id={"delete-button"}
            onClick={async () => {
              if (deleteConfirmation !== "DELETE") return;
              if (!token) return;

              setSpinner(true);

              const result = await handleDeleteAccount(token);

              if (!result) {
                setSpinner(false);
                figma.notify("Failed to delete account");
                return;
              }

              emit("DELETE_ACCOUNT");

              setIsSettingsPageOpen(false);
              setSpinner(false);
              goToLogin();
            }}
          >
            <img src={Spinner} />
            <span>Delete Forever</span>
          </button>
        </div>
      </div>
    </div>
  );

  function goToLogin() {
    setToken("");
    setShowDeleteAccountPopup(false);
    setIsSettingsPageOpen(false);
    setIsLoginPageOpen(true);
  }
}

export default DeleteAccountPopup;
