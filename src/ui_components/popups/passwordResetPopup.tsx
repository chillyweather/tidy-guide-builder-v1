import { h } from "preact";
import { useState } from "preact/hooks";
import { IconX } from "@tabler/icons-react";
import feedbackLoader from "../../images/feedback.gif";
import {
  getPasswordResetToken,
  resetPassword,
} from "../ui_functions/authentication";

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
  const [popupTitle, setPopupTitle] = useState("Reset your password");
  const [popupText, setPopupText] = useState(
    "Enter the email address linked to your account. If it exists in our system, you'll be directed to the screen to create a new password shortly."
  );
  const [popupSecondText, setPopupSecondText] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [isNewPasswordSet, setIsNewPasswordSet] = useState(false);

  if (!show) {
    return null;
  }

  const getTokenContent = () => {
    return (
      <div className="popup-content">
        <label className={"dialogLabel"} hidden={isHidden}>
          <input
            hidden={isHidden}
            className={"dialogInput"}
            type="email"
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
            const result = await getPasswordResetToken(email);
            const resetToken = result.passwordResetToken;
            if (resetToken) {
              setPasswordResetToken(resetToken);
              setPopupTitle("Enter your new password");
              setPopupText("Enter your new password");
              setPopupSecondText("Repeat password");
            } else {
              setPopupTitle("Something went wrong");
              setPopupText(
                "We couldn't find an account with that email address. Please try again."
              );
              setEmail("");
            }
          }}
        >
          Submit
        </button>
      </div>
    );
  };

  const setNewPasword = () => {
    return (
      <div className="popup-content">
        <label className={"dialogLabel"} hidden={isHidden}>
          <input
            hidden={isHidden}
            className={"dialogInput"}
            type="text"
            placeholder={"Password"}
            value={newPassword}
            onInput={(e) => {
              if (e.target) {
                setNewPassword((e.target as HTMLInputElement).value);
              }
            }}
          />
        </label>
        <label className={"dialogLabel"} hidden={isHidden}>
          <input
            hidden={isHidden}
            className={"dialogInput"}
            type="text"
            placeholder={"Repeat password"}
            value={repeatNewPassword}
            onInput={(e) => {
              if (e.target) {
                setRepeatNewPassword((e.target as HTMLInputElement).value);
              }
            }}
          />
        </label>
        <button
          hidden={isHidden}
          className={"button submitButton primary"}
          onClick={async () => {
            try {
              const result = await resetPassword(
                email,
                passwordResetToken,
                newPassword,
                repeatNewPassword
              );
              if (result) {
                setIsNewPasswordSet(true);
                setPasswordResetToken("");
                setPopupTitle("Password reset successful");
                setPopupText(
                  "Your password has been reset. Please, login with your new password."
                );
                setAlign("center");
                setIsHidden(true);
              } else {
                setPopupTitle("Something went wrong");
                setPopupText(
                  "We couldn't find an account with that email address. Please try again."
                );
                setEmail("");
              }
            } catch (error) {
              setPopupTitle("Something went wrong");
              setPopupText("Please, try again.");
            }
          }}
        >
          Submit
        </button>
      </div>
    );
  };

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
        {!passwordResetToken && !isNewPasswordSet && (
          <h2 className={"dialogTitle"}>{popupTitle}</h2>
        )}
        <p style={{ textWrap: "wrap" }}>{popupText}</p>
        {passwordResetToken && !isNewPasswordSet
          ? setNewPasword()
          : getTokenContent()}
        <div className={"image-flex"}>
          <img src={feedbackLoader} hidden={!isHidden}></img>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetPopup;
