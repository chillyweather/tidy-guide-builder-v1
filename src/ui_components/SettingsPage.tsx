import { h } from "preact";
import { useContext, useState, useEffect } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { IconAlertCircleFilled } from "@tabler/icons-react";

const Settings = () => {
  const { setShowDeleteAccountPopup, token } = useContext(BuilderContext) || {};
  const [showUserList, setShowUserList] = useState(false);
  // const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    if (token && showUserList) {
      console.log("will show");
    }
    // async function fetchUsers() {
    //   const response = await getUsers(token);
    //   setListOfUsers(response);
    // }
    // fetchUsers();
  }, [showUserList]);

  return (
    <div className={"settings-wrapper"}>
      <div className="settings-section-plus-userlist">
        <div className="settings-section-flex">
          <div className="settings-section-content">
            <div className="title-flex">
              <h4>Users in your company</h4>
            </div>
            {/* <p>Show all users in your company</p> */}
          </div>
          <button
            id={"settings-primaty-button"}
            className={"button primary"}
            onClick={() => setShowUserList(!showUserList)}
          >
            {showUserList ? "Hide" : "Show"}
          </button>
        </div>
        {showUserList && <div className="userlist"></div>}
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
};

export default Settings;
