/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { IconDotsVertical, IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { collectionsAtom } from "src/state/atoms";
import { useState } from "preact/hooks";
import {
  getCollectionUsers,
  addCollectionUser,
} from "src/ui_components/ui_functions/collectionHandlers";
import { useEffect } from "react";
import { useContext } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { Button } from "@create-figma-plugin/ui";

function manageUsersPage() {
  const [collections] = useAtom(collectionsAtom);
  return (
    <div className={"manage-users"}>
      <h1>Manage users</h1>
      <br />
      <h3>Collections:</h3>
      {renderCollections(collections)}
    </div>
  );
}

export default manageUsersPage;

function renderUsers(collectionId: string) {
  const [collectionUsers, setCollectionUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const { token } = useContext(BuilderContext) || {};
  useEffect(() => {
    async function fetchCollectionUsers() {
      if (!token) return null;
      const data = await getCollectionUsers(token, collectionId);
      setCollectionUsers(data);
    }
    fetchCollectionUsers();
  }, [collectionId]);
  return (
    <div>
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ color: "coral" }}>User name</p>
        <p style={{ color: "coral" }}>Email</p>
        <p style={{ color: "coral" }}>Role</p>
      </div>
      {showAddUserForm && (
        <div className={"add-user-form-wrapper"}>
          <AddUserForm collectionId={collectionId} />
          <button onClick={() => setShowAddUserForm(false)}>
            <IconX />
          </button>
        </div>
      )}
      {collectionUsers &&
        collectionUsers.length &&
        collectionUsers.map((user: any) => {
          return generateUserCard(user);
        })}
    </div>
  );
}

function generateUserCard(user: any): h.JSX.Element {
  return (
    <div
      key={user._id}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <p style={{ color: "green" }}>{user.name}</p>
      <p style={{ color: "green" }}>{user.email}</p>
      <p style={{ color: "green" }}>{user.rank}</p>
      <details>
        <summary>
          <button>
            <IconDotsVertical style={{ color: "green" }} />
          </button>
        </summary>
        <div className="user-menu" style={{ top: "20px" }}>
          <div className="user-item">Edit</div>
          <div className="user-item" onClick={() => console.log("deletion!!!")}>
            Delete
          </div>
        </div>
      </details>
    </div>
  );
}

function renderCollections(collections: never[]) {
  return (
    <div>
      {collections.length &&
        collections.map((collection: any) => {
          return (
            <div key={collection._id}>
              <h4 style={{ color: "blue" }}>{collection.name}</h4>
              <h4>Users:</h4>
              {renderUsers(collection._id)}
            </div>
          );
        })}
    </div>
  );
}

function AddUserForm({ collectionId }: { collectionId: string }): any {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const { token } = useContext(BuilderContext) || {};
  if (!token) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(email, role, collectionId);
    const user = await addCollectionUser(token, collectionId, email, role);
    console.log("user", user);
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
