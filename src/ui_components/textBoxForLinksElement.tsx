import { h, JSX } from "preact";
import { setVideoDataElements } from "./ui_functions/getVideoDetails";
import { IconInfoCircle } from "@tabler/icons-react";

export function videoTextBoxElement(
  value: string,
  setValue: any,
  placeholder = "Title",
  type?: string,
  callback?: any,
  isDisabled: boolean = false,
  setIsValid?: Function
) {
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    if (type === "videoLink") {
      const newValue = event.currentTarget.value;
      setValue(newValue);
      if (isValidYouTubeLink(newValue)) {
        setIsValid!(true);
      } else {
        setIsValid!(false);
      }
    } else {
      const newValue = event.currentTarget.value;
      setValue(newValue);
    }
  }

  function runCallback(type: string | undefined) {
    switch (type) {
      case "videoLink":
        if (isValidYouTubeLink(value)) {
          setVideoDataElements(value, callback);
          setValue("");
        } else {
          setIsValid!(false);
        }
        break;
      case "link":
        callback();
        break;
      default:
        break;
    }
  }

  function isValidYouTubeLink(link: string): boolean {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
    return youtubeRegex.test(link);
  }

  return (
    <div className="inputWithValidation">
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
    </div>
  );
}
