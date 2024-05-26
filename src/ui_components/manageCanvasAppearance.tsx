/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useAtom } from "jotai";
import { appSettingsAtom } from "../state/atoms";
import { useEffect, useState } from "preact/hooks";
import ColorPickerInput from "./ColorPickerInput";
import { TagLabel, TagLine } from "./tagPreviewElements";
import {
  IconCircleNumber1,
  IconSquareNumber1,
  IconSquareRoundedNumber1,
  IconSquareRotated,
} from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";

export default function manageCanvasAppearance() {
  const [appSettings, setAppSettings]: any = useAtom(appSettingsAtom);
  const [tagLabelText] = useState("42");

  const [labelType, setLabelType] = useState<
    "round" | "square" | "square-rounded" | "square-rounded-rotated"
  >(appSettings.labelType || "round");
  const [lineType, setLineType] = useState<"solid" | "dashed">(
    appSettings.lineType || "solid"
  );
  const [tagColor, setTagColor] = useState(appSettings.tagColor || "#F1592A");

  useEffect(() => {
    setAppSettings({
      labelType,
      lineType,
      tagColor,
    });
  }, [labelType, lineType, tagColor]);

  useEffect(() => {
    if (Object.keys(appSettings).length) {
      emit("UPDATE_APP_SETTINGS", appSettings);
    }
  }, [appSettings]);

  return (
    <div className="manage-canvas">
      <h2>
        <strong>Layout elements</strong>
      </h2>
      <br />
      <h2>Anatomy Tags</h2>
      <div className="anatomy-tags-settings-with-preview">
        <div className="anatomy-tags-settings">
          <div className="tags-settings-element">
            <p>Tag Color</p>
            <ColorPickerInput color={tagColor} setColor={setTagColor} />
          </div>
          <div className="tags-settings-element">
            <p>Label Shape</p>
            <div className="appearance-button-wrapper">
              <Button
                label={<IconCircleNumber1 size={24} />}
                type="round"
                setType={setLabelType}
              />
              <Button
                label={<IconSquareNumber1 size={24} />}
                type="square"
                setType={setLabelType}
              />
              <Button
                label={<IconSquareRoundedNumber1 size={24} />}
                type="square-rounded"
                setType={setLabelType}
              />
              <Button
                label={<IconSquareRotated size={24} />}
                type="square-rounded-rotated"
                setType={setLabelType}
              />
            </div>
          </div>
          <div className="tags-settings-element">
            <p>Line Type</p>
            <div className="appearance-button-wrapper">
              <Button label="⏐" type="solid" setType={setLineType} />
              <Button label="┊" type="dashed" setType={setLineType} />
            </div>
          </div>
        </div>
        <div className="tag-preview-frame">
          <div className="tag-preview">
            <TagLabel label={tagLabelText} color={tagColor} shape={labelType} />
            <TagLine color={tagColor} type={lineType} />
          </div>
        </div>
      </div>
    </div>
  );
}

const Button = ({
  label,
  type,
  setType,
}: {
  label: JSX.Element | string;
  type: string;
  setType: (type: any) => void;
}) => {
  function handleClick(type: string) {
    setType(type);
  }

  return (
    <button className="appearance-button" onClick={() => handleClick(type)}>
      {label}
    </button>
  );
};
