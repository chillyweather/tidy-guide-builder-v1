/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "src/BuilderContext";

import { Button } from "@create-figma-plugin/ui";
import { FormType } from "./manageCollectionsPage";
import { useEffect } from "react";

export default function AddCollectionForm({
  type = "Add",
  name = "",
}: {
  type: FormType;
  name?: string;
}): any {
  const { token } = useContext(BuilderContext) || {};
  if (!token) return null;
  // const [selectedCollection]: any = useAtom(selectedCollectionAtom);
  const [collectionName, setCollectionName] = useState(name || "");

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("collectionName", collectionName);
  }

  useEffect(() => {
    console.log("type", type);
  }, [type]);

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
