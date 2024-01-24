import { h } from "preact";
import { useState } from "preact/hooks";
import { IconX } from "@tabler/icons-react";
import feedbackLoader from "../../images/feedback.gif";
import { getPasswordResetToken } from "../ui_functions/authentication";

function PasswordResetPopup({
  show,
  user,
  setShow,
}: {
  show: boolean;
  user: any;
  setShow: any;
}) {
  const [email, setEmail] = useState("");

  const [isHidden, setIsHidden] = useState(false);
  const [align, setAlign] = useState("left");
  const [passwordResetToken, setPasswordResetToken] = useState("");

  if (!show) {
    return null;
  }

  return (
    <div className={"feedbackPopupBackground"} onClick={() => setShow(false)}>
      <div
        className={"feedbackPopup"}
        onClick={(e) => e.stopPropagation()}
        style={{ textAlign: align }}
      >
        <button
          className={"closePopupButton"}
          onClick={() => {
            setShow(false);
          }}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Reset your password</h2>
        <p style={{ textWrap: "wrap" }}>
          Enter the email address linked to your account. If it exists in our
          system, you'll be directed to the screen to create a new password
          shortly.
        </p>
        <label className={"dialogLabel"} hidden={isHidden}>
          <input
            hidden={isHidden}
            className={"dialogInput"}
            type="text"
            placeholder={"Email address"}
            value={email}
            onInput={(e) => {
              if (e.target) {
                setEmail((e.target as HTMLInputElement).value);
              }
            }}
          />
        </label>
        <button
          hidden={isHidden}
          className={"button submitButton primary"}
          onClick={async () => {
            console.log("email", email);
            const result = await getPasswordResetToken(email);
            const resetToken = result.passwordResetToken;
            if (resetToken) {
              setPasswordResetToken(resetToken);
            }
          }}
        >
          Submit
        </button>
        <div className={"image-flex"}>
          <img src={feedbackLoader} hidden={!isHidden}></img>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetPopup;
