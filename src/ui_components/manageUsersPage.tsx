"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import {
  IconDotsVertical,
  IconX,
  IconPencil,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import {
  getCollectionUsers,
  deleteCollectionUser,
} from "src/ui_components/ui_functions/collectionHandlers";
import { useContext, useEffect, useState } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { Button } from "@create-figma-plugin/ui";
import CollectionsInSettingsDropdown from "./CollectionsInSettingsDropdown";
import AddUserForm from "./AddUserForm";

import {
  collectionDocsTriggerAtom,
  collectionsAtom,
  currentPageAtom,
  errorMessageAtom,
  isAddErrorAtom,
  selectedCollectionAtom,
  selectedCollectionInSettingsAtom,
  showEditUserFormAtom,
  userToEditAtom,
} from "src/state/atoms";

function manageUsersPage() {
  const [collections] = useAtom(collectionsAtom);
  const [selectedCollectionInSettings]: any = useAtom(
    selectedCollectionInSettingsAtom
  );
  const [, setCollectionDocsTrigger] = useAtom(collectionDocsTriggerAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  function triggerCollectionRefresh() {
    setCollectionDocsTrigger((n: number) => n + 1);
  }

  useEffect(() => {
    setCurrentPage("setings-section");
    triggerCollectionRefresh();
  }, []);

  return (
    <div className={"manage-users"}>
      <div className="delete-flex hidden"></div>
      <h2>Manage members</h2>
      <br />
      {/* <h3>Collections:</h3> */}
      <CollectionsInSettingsDropdown options={collections} />
      <div>
        {selectedCollectionInSettings &&
          renderUsers(selectedCollectionInSettings._id)}
      </div>
      ;
    </div>
  );
}

export default manageUsersPage;

function renderUsers(collectionId: string) {
  const [collectionUsers, setCollectionUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  //NOTE: problem with atoms
  const [showEditUserForm, setShowEditUserForm] = useAtom(showEditUserFormAtom);
  const [userToEdit, setUserToEdit]: any = useAtom(userToEditAtom);
  const [isAddUserError, setIsAddUserError] = useAtom(isAddErrorAtom);
  const [addErrorMessage, setAddErrorMessage] = useAtom(errorMessageAtom);
  const [trigger, setTrigger] = useState(0);

  const { token } = useContext(BuilderContext) || {};
  useEffect(() => {
    async function fetchCollectionUsers() {
      try {
        if (!token) return null;
        const data = await getCollectionUsers(token, collectionId);
        setCollectionUsers(data);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchCollectionUsers();
  }, [collectionId, trigger]);

  return (
    <div className={"users-flex"}>
      <Button
        className={"users-button"}
        onClick={() => {
          setShowAddUserForm(true);
          setTimeout(function () {
            document.getElementById("mailInput")?.focus();
          }, 100);
        }}
        disabled={showAddUserForm}
      >
        <IconPlus />
        Add
      </Button>
      <div className={"user-card title"}>
        <p>Name</p>
        <p>Email</p>
        <p>Role</p>
      </div>
      {showAddUserForm && (
        <div className="add-user-form-and-validation-wrapper">
          <div className={"add-user-form-wrapper"}>
            <AddUserForm collectionId={collectionId} setTrigger={setTrigger} />
            <button
              onClick={() => {
                setShowAddUserForm(false);
                setIsAddUserError(false);
                setAddErrorMessage("");
              }}
            >
              <IconX />
            </button>
            {isAddUserError && <p className={"error-msg"}>{addErrorMessage}</p>}
          </div>
        </div>
      )}
      {showEditUserForm && (
        <div className={"add-user-form-wrapper"}>
          <AddUserForm
            collectionId={collectionId}
            setTrigger={setTrigger}
            type="Edit"
            userEmail={userToEdit?.email}
            userId={userToEdit?.id}
          />
          <button
            onClick={() => {
              setShowEditUserForm(false);
              setUserToEdit(null);
            }}
          >
            <IconX />
          </button>
        </div>
      )}
      {collectionUsers &&
        collectionUsers.length &&
        collectionUsers.map((user: any) => {
          if (user) {
            return generateUserCard(user, collectionId, setTrigger);
          }
        })}
    </div>
  );
}

function generateUserCard(user: any, collectionId: string, setTrigger: any) {
  const { token } = useContext(BuilderContext) || {};
  const [, setShowEditUserForm] = useAtom(showEditUserFormAtom);
  const [userToEdit, setUserToEdit]: any = useAtom(userToEditAtom);
  const [selectedCollection]: any = useAtom(selectedCollectionAtom);
  const isOwner = selectedCollection?.owner === user.id;
  if (!token) return null;
  function colorMe(a: any, b: any) {
    const colorList = [
      "#F584AD",
      "#AC93F0",
      "#D1423F",
      "#DC1677",
      "#C233A0",
      "#6163E1",
      "#246DB6",
      "#008290",
      "#7BA100",
      "#9355D2",
      "#6D8391",
      "#3B814F",
      "#8190EA",
      "#50CE71",
      "#F2BA3B",
      "#030303",
      "#E38072",
      "#543150",
      "#F8970C",
      "#285736",
      "#00BFA5",
      "#FF7BAD",
      "#84CE29",
      "#FF6D00",
      "#FF372B",
      "#304FFE",
    ];

    let selectedColorIndex =
      a.charCodeAt(0) - 97 + 1 - (b.charCodeAt(0) - 97 + 1);
    if (selectedColorIndex < 0) {
      selectedColorIndex *= -1;
    }

    return colorList[selectedColorIndex];
  }
  return (
    <div className={"user-card-wrapper"}>
      {user.id !== userToEdit?.id && (
        <div key={user._id} className={"user-card"}>
          <div
            className={"user-tag"}
            first-letter={user.email.slice(0, 1)}
            last-letter={user.email.slice(
              user.email.lastIndexOf("@") - 1,
              user.email.lastIndexOf("@")
            )}
            style={{
              backgroundColor: colorMe(
                user.email.slice(0, 1),
                user.email.slice(
                  user.email.lastIndexOf("@") - 1,
                  user.email.lastIndexOf("@")
                )
              ),
            }}
          >
            {user.email.slice(0, 1)}
          </div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>
            <div className={"tag " + user.rank}></div>
          </p>
          {!isOwner && (
            <details>
              <summary>
                <button>
                  <IconDotsVertical />
                </button>
              </summary>
              <div className="user-menu">
                <div
                  className="user-item"
                  onClick={() => {
                    setShowEditUserForm(true);
                    setUserToEdit(user);
                  }}
                >
                  <IconPencil />
                  Edit
                </div>
                <div
                  className="user-item"
                  onClick={async () => {
                    await deleteCollectionUser(token, collectionId, user.email);
                    setTrigger((prevTrigger: number) => prevTrigger + 1);
                  }}
                >
                  <IconTrash />
                  Remove
                </div>
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

// function renderCollections(collections: any[]) {
//   // const [currentUserId] = useAtom(currentUserIdAtom);
//
// }

// function AddUserForm({
//   collectionId,
//   setTrigger,
//   setShowForm,
//   type = "Add",
//   userEmail = "",
//   userId = "",
// }: {
//   collectionId: string;
//   setTrigger: any;
//   setShowForm: any;
//   type?: "Add" | "Edit";
//   userEmail?: string;
//   userId?: string;
// }): any {
//   const { token } = useContext(BuilderContext) || {};
//   if (!token) return null;
//   // const [selectedCollection]: any = useAtom(selectedCollectionAtom);
//   const [userToEdit]: any = useAtom(userToEditAtom);
//   const [, setIsAddUserError] = useAtom(isAddUserErrorAtom);
//   const [, setAddUserMessage] = useAtom(addUserMessageAtom);
//   const [email, setEmail] = useState(userEmail || "");
//   const [role, setRole] = useState(userToEdit ? userToEdit.rank : "Viewer");
//   const [, setUserToEdit] = useAtom(userToEditAtom);
//
//   const handleSubmit = async (e: any) => {
//     if (type === "Add") {
//       e.preventDefault();
//       const response = await addCollectionUser(
//         token,
//         collectionId,
//         email,
//         role
//       );
//       const message = response.message;
//       switch (message) {
//         case "User already exists in the collection":
//           setIsAddUserError(true);
//           setAddUserMessage("User already exists in this collection");
//           break;
//         case "User or collection not found":
//           setIsAddUserError(true);
//           setAddUserMessage("This user does not exist in the system");
//           break;
//         case "User added to collection":
//           setIsAddUserError(false);
//           setAddUserMessage("User added");
//           setShowForm(false);
//           break;
//         default:
//           setIsAddUserError(true);
//           setAddUserMessage("Something went wrong, please try again later");
//           break;
//       }
//       setTrigger((prevTrigger: number) => prevTrigger + 1);
//     } else if (type === "Edit") {
//       e.preventDefault();
//       await changeUserPermissions(token, userId, collectionId, role);
//       setUserToEdit(null);
//       setTrigger((prevTrigger: number) => prevTrigger + 1);
//       setShowForm(false);
//     }
//   };
//
//   return (
//     <form onSubmit={handleSubmit} className={"add-user-form"}>
//       <input
//         type="text"
//         id="mailInput"
//         value={email}
//         placeholder={"Email"}
//         onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
//         disabled={type === "Edit"}
//       />
//
//       <select
//         value={role}
//         onChange={(e) => setRole((e.target as HTMLSelectElement).value)}
//       >
//         <option value="Viewer">Viewer</option>
//         <option value="Editor">Editor</option>
//       </select>
//
//       <Button
//         type="submit"
//         className={"users-button no-margin add-user-button"}
//       >
//         {type === "Edit" ? "Change" : "Add"}
//       </Button>
//     </form>
//   );
// }
