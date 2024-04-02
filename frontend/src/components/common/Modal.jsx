import { createPortal } from "react-dom";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) {
    document.body.style.overflow = "auto";
    return;
  } else {
    document.body.style.overflow = "hidden";
  }

  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    zIndex: 1000,
  };

  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: 1000,
  };

  return createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={() => onClose()} />
      <div
        className="rounded border-4 border-bluePurple p-6 md:p-12 shadow-lg "
        style={MODAL_STYLES}
      >
        <button onClick={() => onClose()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className="w-6 h-6 p-1 stroke-black hover:stroke-white hover:bg-bluePurple hover:rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
