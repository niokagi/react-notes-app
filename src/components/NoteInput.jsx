import { useState, useRef, useEffect } from "react";
import { useNoteInput } from "../hooks/useNoteInput";

export default function NoteInput({ addNote, onClose }) {
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 200);
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const {
    title,
    body,
    remainingChars,
    onTitleChangeHandler,
    onBodyChangeHandler,
    onSubmit,
  } = useNoteInput({ addNote, onClose: handleClose });

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onMouseDown={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-200 ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Note</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <div>
          <div className="mb-4">
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Title
              <span className="text-sm text-gray-500 ml-2">
                ({remainingChars} characters left)
              </span>
            </div>
            <input
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={onTitleChangeHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </div>
            <textarea
              placeholder="Write your note here..."
              value={body}
              onChange={onBodyChangeHandler}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={onSubmit}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Add Note
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
