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
  const [body, setBody] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  // Give feedback

  if (!show) {
    return null;
  }

  return (
    <div className={"feedbackPopupBackground"} onClick={() => setShow(false)}>
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button className={"closePopupButton"} onClick={() => setTitleText("Thanks for your feedback")}>
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>{titleText}</h2>
        <p>
          {bodyText}
        </p>
        <div className={"divider"}></div>
        <p>
          {actionText}
        </p>
        <label className={"dialogLabel"}>
          <input
            className={"dialogInput"}
            type="text"
            placeholder={"Type title..."}
            value={title}
            //@ts-ignore
            onInput={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className={"dialogLabel"}>
          <textarea
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
          <div className="textSymbolsCounterRow">
          <div className="textSymbolsCounter">
            {feedbackText.length}/1500
          </div>
        </div>
        </label>
        <button
          className={"button submitButton primary"}
          onClick={async () => {
            await sendFeedback(title, `${body} \n ----- \n ${user.name}`);
            setShow(false);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default FeedbackPopup;
