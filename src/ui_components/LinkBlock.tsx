import { h } from "preact";
import { videoTextBoxElement } from "./videoTextBoxElement";
import { IconX } from "@tabler/icons-react";

function LinkBlock(sources: any, setSources: any) {
  const addSource = () => {
    setSources([...sources, { source: "", link: "" }]);
  };

  const deleteSource = (index: number) => {
    const newSources = [...sources];
    newSources.splice(index, 1);
    setSources(newSources);
  };

  const updateSource = (
    index: number,
    field: "source" | "link",
    value: string
  ) => {
    const newSources = [...sources];
    newSources[index][field] = value;
    setSources(newSources);
  };

  return (
    <div className={"linkBlock"}>
      {sources.map((source: any, index: number) => (
        <div key={index} style={{ display: "flex", gap: "8px", width: "100%" }}>
          {videoTextBoxElement(
            source.source,
            (value: any) => updateSource(index, "source", value),
            `Source ${index + 1}`
          )}
          {videoTextBoxElement(
            source.link,
            (value: any) => updateSource(index, "link", value),
            `Source ${index + 1} Link`,
            "link",
            addSource,
            source.source.length === 0 ? true : false
          )}
          <button onClick={() => deleteSource(index)}>
            <IconX />
          </button>
        </div>
      ))}
    </div>
  );
}

export default LinkBlock;
