/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useContext, useState, useEffect } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { IconAlertCircleFilled, IconArrowRight } from "@tabler/icons-react";
import { getUsersFromMyCompany } from "./ui_functions/authentication";

const Settings = () => {
  const { setShowDeleteAccountPopup, token } = useContext(BuilderContext) || {};
  const [showUserList, setShowUserList] = useState(false);
  const [listOfUsers, setListOfUsers] = useState([]);

  async function getUsers(token: string) {
    const response = await getUsersFromMyCompany(token);

    if (response && response.length) {
      setListOfUsers(response);
    }
    return response;
  }

  useEffect(() => {
    if (token && showUserList) {
      getUsers(token);
    }
  }, [showUserList]);

  const userList = (
    <div className="userlist">
      {!!listOfUsers.length &&
        listOfUsers.map((user: any) => {
          return (
            <div key={user._id} className="userlist-item">
              <p style={{ padding: 0, margin: 0 }}>
                {user.name} - {user.rank}
              </p>
            </div>
          );
        })}
    </div>
  );

  const SettingsContent = (
    <div className={"settings-wrapper"}>
      <div className="settings-section-plus-userlist">
        <div className="settings-section-flex">
          <div className="settings-section-content">
            <div className="title-flex">
              <h4>Manage users</h4>
            </div>
            {/* <p>Show all users in your company</p> */}
          </div>
          {IconArrowRight}
          <button
            id={"settings-primaty-button"}
            className={"button primary"}
            onClick={() => setShowUserList(!showUserList)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M9.66611 6.66291L15.388 12.6348C15.5567 12.8348 15.6255 13.0223 15.6255 13.1817C15.6255 13.341 15.5561 13.5557 15.4165 13.7001L9.66611 19.7001C9.38174 20 8.87861 20.0097 8.60674 19.7226C8.30596 19.4374 8.29618 18.9607 8.58428 18.6629L13.838 13.1817L8.58799 7.70041C8.2999 7.40353 8.30968 6.92603 8.61045 6.64072C8.87861 6.35353 9.38174 6.36291 9.66611 6.66291Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        {showUserList && userList}
      </div>
      <div className="delete-flex">
        <div className="delete-content">
          <div className="title-flex">
            <IconAlertCircleFilled className={"red-icon icon-16"} />
            <h4>Delete Account</h4>
          </div>
          <p>
            Once you delete an account, there is no going back. <br />
            Please be certain.
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

  return SettingsContent;
};

export default Settings;
