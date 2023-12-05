import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { FunctionalComponent } from "preact";

interface EmptyStateProps {
  default?: boolean;
  // other props...
}

const EmptyState: FunctionalComponent<EmptyStateProps> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <img
        src="https://2.bp.blogspot.com/-bT_AbYgXOZM/V4avzIwwYTI/AAAAAAAAEFg/m87Jv0eDLo4E27LjX0B4RWh6T3SMtPBYgCLcB/s1600/FullSizeRender-13.jpg"
        alt="empty"
        style={{ width: "50%" }}
      />
      <p>Before initiating the Tidy Builder, you need to select a component.</p>
      <button
        onClick={() => {
          emit("GET_SELECTION");
        }}
      >
        Select component
      </button>
    </div>
  );
};

export default EmptyState;
