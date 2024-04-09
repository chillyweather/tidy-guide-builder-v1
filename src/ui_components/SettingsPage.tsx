/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { IconAlertCircleFilled, IconArrowRight, IconUser, IconChevronRight } from "@tabler/icons-react";
import manageUsersPage from "./manageUsersPage";

const Settings = () => {
  const { setShowDeleteAccountPopup } = useContext(BuilderContext) || {};
  const [showSettingsContent, setShowSettingsContent] = useState(true);
  const [showManageUsersPage, setShowManageUsersPage] = useState(false);

  const SettingsContent = (
    <div className={"settings-wrapper"}>
      <div className="settings-section-plus-userlist">
        <div className="settings-section-flex">
          <div className="settings-section-content">
            <div className="title-flex">
              <IconUser className={"title-icon icon-16"} />
              <h4>Manage members</h4>
            </div>
            {/* <p>Show all users in your company</p> */}
          </div>
          {IconArrowRight}
          <button
            id={"settings-primary-button"}
            className={"button primary"}
            onClick={() => {
              setShowSettingsContent(false);
              setShowManageUsersPage(true);
            }}
          >
           <IconChevronRight />
          </button>
        </div>
      </div>
      <div className="delete-flex">
        <div className="delete-content">
          <div className="title-flex">
            <IconAlertCircleFilled className={"red-icon icon-16"} />
            <h4>Delete Account</h4>
          </div>
          <p>
          Permanently delete the account and remove access to all users.
          </p>
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

  return (
    <div style={{ width: "100%" }}>
      {showSettingsContent && SettingsContent}
      {showManageUsersPage && manageUsersPage()}
    </div>
  );
};

export default Settings;
