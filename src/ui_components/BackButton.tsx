import { h } from "preact";
import { useAtom } from "jotai";
// import { useContext } from "preact/hooks";
// import BuilderContext from "src/BuilderContext";
import {
  currentPageAtom,
  isDetailsPageOpenAtom,
  isToBuildComponentPicAtom,
  selectedNodeKeyAtom,
  selectedNodeIdAtom,
  selectedComponentPicAtom,
  selectedElementAtom,
  selectedElementNameAtom,
  showIndexPageAtom,
  showMainContentAtom,
  showContentFromServerAtom,
  showSettingsPageAtom,
  isDocJustOpenedAtom,
  isResetAtom,
  showSettingsContentAtom,
  showManageUsersPageAtom,
  showManageCollectionsPageAtom,
  showEditCollectionFormAtom,
  showEditUserFormAtom,
} from "../state/atoms";
import { IconArrowLeft } from "@tabler/icons-react";

export default function BackButton() {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [, setIsDetailsPageOpen] = useAtom(isDetailsPageOpenAtom);
  const [, setIsToBuildComponentPic] = useAtom(isToBuildComponentPicAtom);
  const [, setSelectedNodeKey] = useAtom(selectedNodeKeyAtom);
  const [, setSelectedNodeId] = useAtom(selectedNodeIdAtom);
  const [, setSelectedComponentPic] = useAtom(selectedComponentPicAtom);
  const [, setSelectedElement] = useAtom(selectedElementAtom);
  const [, setSelectedElementName] = useAtom(selectedElementNameAtom);
  const [, setIsIndexOpen] = useAtom(showIndexPageAtom);
  const [, setIsMainContentOpen] = useAtom(showMainContentAtom);
  const [, setIsContenFromServerOpen] = useAtom(showContentFromServerAtom);
  const [, setIsSettingsPageOpen] = useAtom(showSettingsPageAtom);
  const [, setIsDocJustOpened] = useAtom(isDocJustOpenedAtom);
  const [, setIsReset] = useAtom(isResetAtom);
  const [, setShowSettingsContent] = useAtom(showSettingsContentAtom);
  const [, setShowManageUsersPage] = useAtom(showManageUsersPageAtom);
  const [, setShowManageCollectionsPage] = useAtom(
    showManageCollectionsPageAtom
  );
  const [, setShowEditCollectionForm] = useAtom(showEditCollectionFormAtom);
  const [, setShowEditUserForm] = useAtom(showEditUserFormAtom);

  function backToIndex() {
    setIsSettingsPageOpen(false);
    setIsIndexOpen(true);

    setIsMainContentOpen(false);
    setIsDetailsPageOpen(false);
    setIsToBuildComponentPic(false);
    setSelectedElement(null);
    setSelectedElementName("");
    setSelectedNodeKey("");
    setSelectedNodeId("");
    setSelectedComponentPic("");
    setIsContenFromServerOpen(false);
    setIsDocJustOpened(true);
    setIsReset(true);
  }

  function backToSettings() {
    setIsSettingsPageOpen(false);
    setShowEditCollectionForm(false);
    setShowEditUserForm(false);
    setShowManageCollectionsPage(false);
    setShowManageUsersPage(false);
    setShowSettingsContent(true);
  }

  return (
    <button
      onClick={() => {
        switch (currentPage) {
          case "details":
            backToIndex();
            break;
          case "new-documnent":
            backToIndex();
            break;
          case "settings":
            backToIndex();
            break;
          case "setings-section":
            backToSettings();
            setCurrentPage("settings");
            break;
          case "logout":
            backToIndex();
            break;
          default:
            backToIndex();
            break;
        }
      }}
      className="flex-button back-button"
    >
      <IconArrowLeft />
      Back
    </button>
  );
}
