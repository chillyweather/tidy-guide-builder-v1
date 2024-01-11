import { h } from "preact";
import { useEffect } from "preact/hooks";
import { createPortal } from "preact/compat";

const Toast = ({
  message,
  onClose,
  type,
}: {
  message: string;
  onClose: Function;
  type?: string;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const isError = type === "error";

  function setToastClass(type: string) {
    switch (type) {
      case "error":
        return "custom-toast custom-toast-error";
      case "success":
        return "custom-toast custom-toast-success";
      case "warning":
        return "custom-toast custom-toast-warning";
      case "idle":
        return "custom-toast";
      default:
        return "custom-toast";
    }
  }

  return createPortal(
    <div
      className={isError ? "custom-toast custom-toast-error" : "custom-toast"}
    >
      <div className="custom-toast-message">{message}</div>
    </div>,
    document.body
  );
};

export default Toast;
