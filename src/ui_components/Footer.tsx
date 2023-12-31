import { h } from "preact";
import { useContext, useEffect } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { IconReload } from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import {
  getDocumentations,
  updateDocumentation,
  createDocumentation,
} from "./ui_functions/documentationHandlers";

const Footer = ({
  setShowCancelPopup,
  setIsBuilding,
  isBuilding,
  documentationData,
}: {
  setShowCancelPopup: Function;
  setIsBuilding: Function;
  isBuilding: boolean;
  documentationData: any;
}) => {
  const documentationTitle = useContext(BuilderContext)?.documentationTitle;
  const selectedElementKey = useContext(BuilderContext)?.selectedElementKey;
  const isValid = !!documentationTitle?.length && !!selectedElementKey?.length;
  const token = useContext(BuilderContext)?.token;
  const isLoading = useContext(BuilderContext)?.isLoading;
  const setIsLoading = useContext(BuilderContext)?.setIsLoading;
  const setShowResetPopup = useContext(BuilderContext)?.setShowResetPopup;

  async function handleDocumentation(token: string, data: any) {
    // const id = Object.values(data)[0];
    const id = data._id;
    console.log("id", id);
    if (typeof id !== "string") return;
    setIsLoading(true);
    const result = await getDocumentations(token);
    console.log("result in func", result);
    const isDocumented = result.some((doc: any) => doc._id === id);
    if (isDocumented) {
      await updateDocumentation(token, id, data);
    } else {
      await createDocumentation(token, data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (Object.keys(documentationData).length > 0 && isBuilding && token) {
      handleDocumentation(token, documentationData);
    }
  }, [documentationData, isBuilding, token]);

  return (
    <div className={"footer"}>
      <div className="leftFooterContent">
        <button className={"flex-btn"} onClick={() => setShowResetPopup(true)}>
          <IconReload />
          Reset
        </button>
      </div>
      <div className="rightFooterContent">
        <button
          className={"second"}
          onClick={() => {
            setIsBuilding(true);
          }}
        >
          Save Changes
        </button>
        <button
          className={isValid ? "primary split" : "primary split primary-disabled"}
          onClick={() => {
            setIsBuilding(true);
          }}
          disabled={!isValid}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default Footer;
