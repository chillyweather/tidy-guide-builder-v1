/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { IconDotsVertical } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { collectionsAtom } from "src/state/atoms";
import { useState } from "preact/hooks";
import { getCollectionUsers } from "src/ui_components/ui_functions/collectionHandlers";
import { useEffect } from "react";
import { useContext } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { Button } from "@create-figma-plugin/ui";

function manageUsersPage() {
  const [collections] = useAtom(collectionsAtom);
  return (
    <div style={{ width: "100%" }}>
      <h1>Manage users</h1>
      <br />
      <h3>Collections:</h3>
      {renderCollections(collections)}
    </div>
  );
}

export default manageUsersPage;

function renderUsers(users: any[], collectionId: string) {
  const [collectionUsers, setCollectionUsers] = useState([]);
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ color: "coral" }}>User name</p>
        <p style={{ color: "coral" }}>Email</p>
        <p style={{ color: "coral" }}>Role</p>
        <IconDotsVertical style={{ color: "green" }} />
      </div>
      {collectionUsers &&
        collectionUsers.length &&
        collectionUsers.map((user: any) => {
          return (
            <div
              key={user._id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p style={{ color: "green" }}>{user.name}</p>
              <p style={{ color: "green" }}>{user.email}</p>
              <p style={{ color: "green" }}>{user.rank}</p>
              <IconDotsVertical style={{ color: "green" }} />
            </div>
          );
        })}
    </div>
  );
}

function renderCollections(collections: never[]) {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  return (
    <div>
      {collections.length &&
        collections.map((collection: any) => {
          return (
            <div key={collection._id}>
              <h4 style={{ color: "blue" }}>{collection.name}</h4>
              <h4>Users:</h4>
              <Button
                onClick={() => {
                  setShowAddUserForm(true);
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                Add user
              </Button>
              ;{renderUsers(collection.users, collection._id)}
            </div>
          );
        })}
    </div>
  );
}

// function AddUserForm() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('Viewer');
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your logic to add the user here
//   };
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" value={name} onChange={e => setName(e.target.value)} />
//       </label>
//       <label>
//         Email:
//         <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
//       </label>
//       <label>
//         Role:
//         <select value={role} onChange={e => setRole(e.target.value)}>
//           <option value="Viewer">Viewer</option>
//           <option value="Editor">Editor</option>
//         </select>
//       </label>
//       <button type="submit">Add</button>
//     </form>
//   );
// }
