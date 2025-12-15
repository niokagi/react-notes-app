import { useState, useRef, useEffect } from "react";
import { useNoteInput } from "../hooks/useNoteInput";
import { X } from "lucide-react";

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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onMouseDown={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-200 ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {noteToEdit ? "Edit Note" : "Create New Note"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="note-title" className="block text-sm font-bold text-gray-900">
                Title
              </label>
              <span className={`text-sm font-medium ${remainingChars < 10 ? 'text-gray-900' : 'text-gray-600'}`}>
                {remainingChars} characters left
              </span>
            </div>
            <input
              id="note-title"
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={onTitleChangeHandler}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="note-content" className="block text-sm font-bold text-gray-900 mb-2">
              Content
            </label>
            <textarea
              id="note-content"
              placeholder="Write your note here..."
              value={body}
              onChange={onBodyChangeHandler}
              rows={10}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900 resize-none transition-all"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all font-semibold border-2 border-gray-900"
            >
              {noteToEdit ? "Update Note" : "Add Note"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-white text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-100 transition-all font-semibold border-2 border-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
