import React, { useEffect } from "react";
import "./popup.css";

function Popup({ greeting, message, closePopup,fnBtn }) {
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
      <div className="popup-window flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-bold text-2xl text-red-600">{greeting}</h2>
        <div className="popup-message ">{message}</div>
        <div className="flex justify-end gap-2 mt-3">
          <button className="py-1 px-4 bg-red-600 text-white rounded-[8px]" onClick={fnBtn}>
            Logout
          </button>
          <button className="border-2 py-1 px-2 rounded-[8px]" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
