/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import {
  IconDotsVertical,
  IconX,
  IconPencil,
  IconTrash,
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
        onClick={() => {
          setShowAddUserForm(true);
        }}
        style={{
          cursor: "pointer",
        }}
        disabled={showAddUserForm}
      >
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
  return (
    <div key={user._id} className={"user-card"}>
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

      <Button type="submit">Add</Button>
    </form>
  );
}
