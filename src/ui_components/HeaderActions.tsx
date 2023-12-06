import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { IconUnlink } from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";

function HeaderActions() {
  const elementGroupStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };
  const selectedElementName = useContext(BuilderContext)?.selectedElementName;
  const setSelectedElement = useContext(BuilderContext)?.setSelectedElement;
  const selectedSections = useContext(BuilderContext)?.selectedSections;
  const setSelectedSections = useContext(BuilderContext)?.setSelectedSections;
  return (
    <div class={"headerContent headerActions"}>
      <div style={elementGroupStyle}>
        <p style={{ color: "#9747FF", padding: 0, margin: 0 }}>
          {selectedElementName}
        </p>
        <IconUnlink
          style={{ color: "#9747FF", height: "14px", cursor: "pointer" }}
          onClick={() => {
            setSelectedElement(null);
            emit("CLEAR_SELECTION");
          }}
        />
      </div>
      <div style={elementGroupStyle}>
        <button
          onClick={() => {
            if (selectedSections && selectedSections?.length < 2) {
              setSelectedSections((prevSections: any[]) => [
                prevSections[0],
                ...prevSections,
              ]);
            }
          }}
        >
          Add component
        </button>
        <button>Preview</button>
      </div>
    </div>
  );
}

export default HeaderActions;
