import { h, JSX } from "preact";
import { setVideoDataElements } from "../ui_functions/getVideoDetails";

export function videoTextBoxElement(
  value: string,
  setValue: any,
  placeholder = "Title",
  type?: string,
  callback?: any,
  isDisabled: boolean = false
) {
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setValue(newValue);
  }

  function runCallback(type: string | undefined) {
    switch (type) {
      case "videoLink":
        setVideoDataElements(value, callback);
        setValue("");
        break;
      case "link":
        callback();
        break;
      default:
        break;
    }
  }

  return (
    <input
      onInput={handleInput}
      onKeyDown={async (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          runCallback(type);
        }
      }}
      placeholder={placeholder}
      value={value}
      className={"dialogInput"}
      disabled={isDisabled}
    />
  );
}
