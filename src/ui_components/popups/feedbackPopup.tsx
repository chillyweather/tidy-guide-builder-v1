import { h } from "preact";
import { useState } from "preact/hooks";
import { sendFeedback } from "../ui_functions/sendFeedback";

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

  if (!show) {
    return null;
  }

  return (
    <div className={"feedbackPopupBackground"} onClick={() => setShow(false)}>
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <h2 className={"dialogTitle"}>Feedback</h2>
        <label className={"dialogLabel"}>
          Add a title:
          <input
            className={"dialogInput"}
            type="text"
            value={title}
            //@ts-ignore
            onInput={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className={"dialogLabel"}>
          Add a description:
          <textarea
            className={"dialogTextarea"}
            value={body}
            onInput={(e) => {
              //@ts-ignore
              setBody(e.target.value);
            }}
          />
        </label>
        <button
          className={"button submitButton"}
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
