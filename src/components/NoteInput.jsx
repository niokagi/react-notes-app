import { useState, useRef, useEffect } from "react";
import { useNoteInput } from "../hooks/useNoteInput";

export default function NoteInput({ addNote, editNote, noteToEdit, onClose }) {
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
  } = useNoteInput({ addNote, editNote, noteToEdit, onClose: handleClose });

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onMouseDown={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 shadow-2xl ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {noteToEdit ? "Edit Note" : "Create New Note"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-all"
          >
            ✕
          </button>
        </div>

        <div>
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Title
              </label>
              <span className={`text-sm font-medium ${remainingChars < 10 ? 'text-red-500' : 'text-gray-500'}`}>
                {remainingChars} characters left
              </span>
            </div>
            <input
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={onTitleChangeHandler}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              placeholder="Write your note here..."
              value={body}
              onChange={onBodyChangeHandler}
              rows={8}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={onSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {noteToEdit ? "Update Note" : "Add Note"}
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
