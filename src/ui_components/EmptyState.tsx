import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";

export default function EmptyState() {
  return (
    <div
      className={"empty-state"}
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
        className={"empty-image"}
      />
      <p>Before initiating the Tidy Builder, you need to select a component.</p>
      <button className={"buttonPrimary"}
        onClick={() => {
          emit("GET_SELECTION");
        }}
      >
        Select component
      </button>
    </div>
  );
}
