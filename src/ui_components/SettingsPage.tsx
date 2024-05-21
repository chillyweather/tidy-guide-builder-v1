/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import {
  IconAlertCircleFilled,
  IconArrowRight,
  IconUser,
  IconChevronRight,
} from "@tabler/icons-react";
import manageUsersPage from "./manageUsersPage";
import manageCollectionsPage from "./manageCollectionsPage";

const Settings = () => {
  const { setShowDeleteAccountPopup } = useContext(BuilderContext) || {};
  const [showSettingsContent, setShowSettingsContent] = useState(true);
  const [showManageUsersPage, setShowManageUsersPage] = useState(false);
  const [showManageCollectionsPage, setShowManageCollectionsPage] =
    useState(false);

  const SettingsContent = (
    <div className={"settings-wrapper"}>
      {/* appearance on canavas */}
      <SettingsSection
        props={{
          icon: IconUser,
          title: "Appearance on canvas",
          description: "Set up how your Figma layout will look",
          onClick: () => {
            setShowSettingsContent(false);
            setShowManageUsersPage(true);
            setShowManageCollectionsPage(false);
          },
        }}
      />
      {/* users */}
      <SettingsSection
        props={{
          icon: IconUser,
          title: "Manage users",
          description: "Show all users in your company",
          onClick: () => {
            setShowSettingsContent(false);
            setShowManageUsersPage(true);
            setShowManageCollectionsPage(false);
          },
        }}
      />
      {/* collections */}
      <SettingsSection
        props={{
          icon: IconUser,
          title: "Manage collections",
          description: "Show all collections in your company",
          onClick: () => {
            setShowSettingsContent(false);
            setShowManageUsersPage(false);
            setShowManageCollectionsPage(true);
          },
        }}
      />
      <div className="delete-flex">
        <div className="delete-content">
          <div className="title-flex">
            <IconAlertCircleFilled className={"red-icon icon-16"} />
            <h4>Delete Account</h4>
          </div>
          <p>Permanently delete the account and remove access to all users.</p>
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
      {showManageCollectionsPage && manageCollectionsPage()}
    </div>
  );
};

export default Settings;

function SettingsSection({
  props,
}: {
  props: {
    icon: any;
    title: string;
    description: string;
    onClick: () => void;
  };
}) {
  return (
    <div className="settings-section-plus-userlist">
      <div className="settings-section-flex">
        <div className="settings-section-content">
          <div className="title-flex">
            {props.icon}
            <h4>{props.title}</h4>
          </div>
          <p>{props.description}</p>
        </div>
        {IconArrowRight}
        <button
          id={"settings-primary-button"}
          className={"button primary"}
          onClick={props.onClick}
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}
