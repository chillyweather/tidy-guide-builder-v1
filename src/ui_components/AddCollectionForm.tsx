/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "src/BuilderContext";

import { Button } from "@create-figma-plugin/ui";

export default function AddCollectionForm({
  type = "Add",
  userEmail = "",
}: {
  type?: "Add" | "Edit";
  userEmail?: string;
}): any {
  const { token } = useContext(BuilderContext) || {};
  if (!token) return null;
  // const [selectedCollection]: any = useAtom(selectedCollectionAtom);
  const [collectionName, setCollectionName] = useState(userEmail || "");

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("collectionName", collectionName);
  }

  return (
    <form onSubmit={handleSubmit} className={"add-user-form"}>
      <input
        type="text"
        id="mailInput"
        value={collectionName}
        placeholder={"Collection name"}
        onChange={(e) =>
          setCollectionName((e.target as HTMLInputElement).value)
        }
        disabled={type === "Edit"}
      />

      <Button
        type="submit"
        className={"users-button no-margin add-user-button"}
      >
        {type === "Edit" ? "Change" : "Add"}
      </Button>
    </form>
  );
}
