import React, { useEffect } from "react";
import "./popup.css";

function Popup({ greeting, message, fnBtn, closePopup, icon, gs }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("popup-overlay")) {
      closePopup();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div
        className="popup-window flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex justify-center items-end gap-2 font-bold text-3xl ${gs}`}>{icon} {greeting}</div>
        <div className="popup-message m-2 text-[1.15rem] text-gray-800">{message}</div>
        <div className="flex flex-wrap justify-end items-center gap-2 mt-3">
          {fnBtn}
          <button
            className="border-2 py-1 px-2 rounded-[8px]"
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
