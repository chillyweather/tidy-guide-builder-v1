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
  const [body, setBody] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  if (!show) {
    return null;
  }

  return (
    <div className={"feedbackPopupBackground"} onClick={() => setShow(false)}>
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button className={"closePopupButton"} onClick={() => setShow(false)}>
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Give feedback</h2>
        <p>
          Do you a suggestion ot had any problem?
          <br />
          Let us know in the fields below
        </p>
        <div className={"divider"}></div>
        <p>
          Please leave your feedback below
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
