import { h } from "preact";
import { useState } from "preact/hooks";
import { sendFeedback } from "../ui_functions/sendFeedback";
import { IconX } from "@tabler/icons-react";

function FeedbackPopup({
  show,
  user,
  setShow,
}: {
  show: boolean;
  user: any;
  setShow: any;
}) {
  const [title, setTitle] = useState("");
  const [titleText, setTitleText] = useState("Give feedback");
  const [bodyText, setBodyText] = useState("Do you a suggestion ot had any problem?\nLet us know in the fields below");
  const [actionText, setActionText] = useState("Please leave your feedback below");
  const [isHidden, setIsHidden] = useState(false);
  const [align, setAlign] = useState("left");
  const [body, setBody] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  // Give feedback

  if (!show) {
    return null;
  }

  return (
    <div className={"feedbackPopupBackground"} onClick={() => setShow(false)}>
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()} style={{ textAlign: align }}>
        <button className={"closePopupButton"} onClick={() => {
          setTitleText("Thanks for your feedback")
          setBodyText("Your feedback means a lot to us")
          setActionText("")
          setAlign("center")
          setIsHidden(true)
        }}>
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>{titleText}</h2>
        <p>
          {bodyText}
        </p>
        <div className={"divider"} hidden={isHidden}></div>
        <p>
          {actionText}
        </p>
        <label className={"dialogLabel"} hidden={isHidden}>
          <input
            hidden={isHidden}
            className={"dialogInput"}
            type="text"
            placeholder={"Type title..."}
            value={title}
            //@ts-ignore
            onInput={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className={"dialogLabel"} hidden={isHidden}>
          <textarea
            hidden={isHidden}
            className={"dialogTextarea"}
            value={body}
            maxLength={1500}
            placeholder={"Type text..."}
            onInput={(e) => {
              //@ts-ignore
              setBody(e.target.value);
              setFeedbackText(e.currentTarget.value);
            }}
          />
          <div className="textSymbolsCounterRow" hidden={isHidden}>
            <div className="textSymbolsCounter">
              {feedbackText.length}/1500
            </div>
          </div>
        </label>
        <button
          hidden={isHidden}
          className={"button submitButton primary"}
          onClick={async () => {
            await sendFeedback(title, `${body} \n ----- \n ${user.name}`);
            setShow(false);
          }}
        >
          Submit
        </button>
        <div className="divider short" hidden={!isHidden}></div>
      </div>
    </div >
  );
}

export default FeedbackPopup;
