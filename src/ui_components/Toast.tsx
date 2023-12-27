import { h } from "preact";
import { useEffect } from "preact/hooks";
import { createPortal } from "preact/compat";

const Toast = ({
  message,
  onClose,
}: {
  message: string;
  onClose: Function;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return createPortal(
    <div className="custom-toast">
      <div className="custom-toast-message">{message}</div>
    </div>,
    document.body
  );
};

export default Toast;
