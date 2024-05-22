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

  function backToIndex() {
    setIsDetailsPageOpen(false);
    setIsToBuildComponentPic(false);
    setSelectedElement(null);
    setSelectedElementName("");
    setSelectedNodeKey("");
    setSelectedNodeId("");
    setSelectedComponentPic("");
    setIsIndexOpen(true);
    setIsMainContentOpen(false);
    setIsContenFromServerOpen(false);
    // setIsSettingsPageOpen(false);
    // setIsDocJustOpened(true);
    // setIsReset(true);
  }

  return (
    <button
      onClick={() => {
        switch (currentPage) {
          case "details":
            setCurrentPage("index");
            break;
          case "new-documnent":
            setCurrentPage("index");
            break;
          case "settings":
            setCurrentPage("index");
            break;
          case "setings-section":
            setCurrentPage("settings");
            break;
          case "logout":
            setCurrentPage("login");
            break;
          default:
            setCurrentPage("index");
            break;
        }
      }}
      class="back-button"
    >
      <IconArrowLeft />
    </button>
  );
}
