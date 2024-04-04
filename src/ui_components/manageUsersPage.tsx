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
import { collectionsAtom, currentUserIdAtom } from "src/state/atoms";
import {
  getCollectionUsers,
  addCollectionUser,
  deleteCollectionUser,
} from "src/ui_components/ui_functions/collectionHandlers";
import { useContext, useEffect, useState } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { Button } from "@create-figma-plugin/ui";
import CollectionsDropdown from "./CollectionsDropdown";

function manageUsersPage() {
  const [collections] = useAtom(collectionsAtom);
  const [currentUserId] = useAtom(currentUserIdAtom);
  const userCollections = collections.filter(
    (collection: any) => collection.owner === currentUserId
  );
  return (
    <div className={"manage-users"}>
      <div className="delete-flex hidden"></div>
      <h2>Manage users</h2>
      <br />
      {/* <h3>Collections:</h3> */}
      <CollectionsDropdown
        options={userCollections}
        onSelect={() => console.log("yey!!!")}
      />
      {renderCollections(collections)}
    </div>
  );
}

export default manageUsersPage;

function renderUsers(collectionId: string) {
  const [collectionUsers, setCollectionUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const { token } = useContext(BuilderContext) || {};

  useEffect(() => {
    async function fetchCollectionUsers() {
      if (!token) return null;
      const data = await getCollectionUsers(token, collectionId);
      setCollectionUsers(data);
    }
    fetchCollectionUsers();
  }, [collectionId, trigger]);

  return (
    <div className={"users-flex"}>
      <Button
        className={"users-button"}
        onClick={() => {
          setShowAddUserForm(true);
        }}
        disabled={showAddUserForm}
      >
        <IconPlus />
        Add user
      </Button>
      <div className={"user-card title"}>
        <p>User name</p>
        <p>Email</p>
        <p>Role</p>
      </div>
      {showAddUserForm && (
        <div className={"add-user-form-wrapper"}>
          <AddUserForm collectionId={collectionId} setTrigger={setTrigger} />
          <button onClick={() => setShowAddUserForm(false)}>
            <IconX />
          </button>
        </div>
      )}
      {collectionUsers &&
        collectionUsers.length &&
        collectionUsers.map((user: any) => {
          return generateUserCard(user, collectionId, setTrigger);
        })}
    </div>
  );
}

function generateUserCard(user: any, collectionId: string, setTrigger: any) {
  const { token } = useContext(BuilderContext) || {};
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

    let selectedColorIndex = (a.charCodeAt(0) - 97 + 1) - (b.charCodeAt(0) - 97 + 1);
    if (selectedColorIndex < 0) {
      selectedColorIndex *= -1;
    }
    
    return colorList[selectedColorIndex]
  }
  return (
    <div key={user._id} className={"user-card"}>
      <div
        className={"user-tag"}
        first-letter={user.email.slice(0, 1)}
        last-letter={user.email.slice(user.email.lastIndexOf("@") - 1, user.email.lastIndexOf("@"))}
        style={{ backgroundColor: colorMe(user.email.slice(0, 1), user.email.slice(user.email.lastIndexOf("@") - 1, user.email.lastIndexOf("@"))) }}
      >
        {user.email.slice(0, 1)}
      </div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>
        <div className={"tag " + user.rank}></div>
      </p>
      <details>
        <summary>
          <button>
            <IconDotsVertical />
          </button>
        </summary>
        <div className="user-menu">
          <div className="user-item">
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
    </div>
  );
}

function renderCollections(collections: any[]) {
  const [currentUserId] = useAtom(currentUserIdAtom);
  return (
    <div>
      {collections.length &&
        collections.map((collection: any) => {
          const isOwner = collection.owner === currentUserId;
          return isOwner ? (
            <div key={collection._id}>
              {/* <h4 style={{ color: "blue" }}>{collection.name}</h4> */}
              {/* <h4>Users:</h4> */}
              {renderUsers(collection._id)}
            </div>
          ) : null;
        })}
    </div>
  );
}

function AddUserForm({
  collectionId,
  setTrigger,
}: {
  collectionId: string;
  setTrigger: any;
}): any {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const { token } = useContext(BuilderContext) || {};
  if (!token) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addCollectionUser(token, collectionId, email, role);
    setTrigger((prevTrigger: number) => prevTrigger + 1);
  };

  return (
    <form onSubmit={handleSubmit} className={"add-user-form"}>
      <input
        type="text"
        value={email}
        placeholder={"Email"}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
      />

      <select
        value={role}
        onChange={(e) => setRole((e.target as HTMLSelectElement).value)}
      >
        <option value="Viewer">Viewer</option>
        <option value="Editor">Editor</option>
      </select>

      <Button type="submit" className={"users-button no-margin add-user-button"}>Add</Button>
    </form>
  );
}
