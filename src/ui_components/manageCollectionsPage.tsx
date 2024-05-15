/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { findUserRole } from "./ui_functions/findUserRole";
import {
  IconDotsVertical,
  IconX,
  IconPencil,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { collectionsAtom, currentUserIdAtom, usersAtom } from "src/state/atoms";

export type FormType = "Add" | "Edit";

import { StateUpdater, useContext, useEffect, useState } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { Button } from "@create-figma-plugin/ui";
import AddCollectionForm from "./AddCollectionForm";

function manageCollectionsPage() {
  const [collections] = useAtom(collectionsAtom);

  return (
    <div className={"manage-users"}>
      <div className="delete-flex hidden"></div>
      <h2>Manage collections</h2>
      <br />
      {generateContent(collections)}
    </div>
  );
}

export default manageCollectionsPage;

function generateContent(collections: any) {
  const [showAddCollectionForm, setShowAddCollectionForm] = useState(false);
  const [currentFormType, setCurrentFormType] = useState<FormType>("Add");
  return (
    <div className={"users-flex"}>
      <Button
        className={"users-button"}
        onClick={() => {
          setCurrentFormType("Add");
          setShowAddCollectionForm(true);
          // setTimeout(function () {
          //   document.getElementById("mailInput")?.focus();
          // }, 100);
        }}
        // disabled={showAddUserForm}
      >
        <IconPlus />
        Add
      </Button>
      <div className={"user-card title"}>
        <p>Name</p>
        <p>Owner</p>
        <p>Role</p>
      </div>
      {showAddCollectionForm && (
        <div className={"add-user-form-wrapper"}>
          <AddCollectionForm type={currentFormType} />
          <button
            onClick={() => {
              setShowAddCollectionForm(false);
            }}
          >
            <IconX />
          </button>
        </div>
      )}
      {collections.map((collection: any) => {
        return generateCollectionCard(
          collection,
          setShowAddCollectionForm,
          setCurrentFormType
        );
      })}
    </div>
  );
}

function generateCollectionCard(
  collection: any,
  setShowAddCollectionForm: StateUpdater<boolean>,
  setCurrentFormType: StateUpdater<FormType>
) {
  const { token } = useContext(BuilderContext) || {};
  const [currentUser] = useAtom(currentUserIdAtom);
  const [collectionOwnerEmail, setCollectionOwnerEmail] = useState("");
  const [users] = useAtom(usersAtom);
  // const isOwner = selectedCollection?.owner === .id;
  if (!token) return null;

  const userRole = findUserRole(collection, currentUser);

  function findUserEmail(users: any, userId: string) {
    const user = users.find((user: any) => user.id === userId);
    return user ? user.email : null;
  }

  useEffect(() => {
    if (users.length) {
      const ownerEmail = findUserEmail(users, collection.owner);
      setCollectionOwnerEmail(ownerEmail);
    }
  }, [users]);

  return (
    <div className={"user-card-wrapper"}>
      <div className={"user-card"}>
        <p>{collection.name}</p>
        <p>{collectionOwnerEmail}</p>
        <p>{userRole}</p>
        {userRole !== "Viewer" && (
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
                  setCurrentFormType("Edit");
                  setShowAddCollectionForm(true);
                }}
              >
                <IconPencil />
                Edit
              </div>
              <div
                className="user-item"
                onClick={async () => {
                  console.log("delete collection");
                  // NOTE: check if there are documents in the collection
                  // NOTE: if there are documents, show popup
                  // NOTE: if there are no documents, delete collection
                }}
              >
                <IconTrash />
                Remove
              </div>
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
