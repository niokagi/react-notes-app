import { useState } from "react";
import { Archive, ArchiveRestore, Trash2, Edit2 } from "lucide-react";
import { showFormattedDate } from "../data/data";

export default function NoteItem({ note, onDelete, onArchive, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  
  const handleDelete = () => {
    setShowModal(false);
    onDelete(note.id);
  };

  return (
    <>
      <article 
        className="bg-white border-2 border-gray-200 rounded-lg p-6 transition-all duration-200 hover:border-gray-900 hover:shadow-lg h-[240px] flex flex-col"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <time className="text-xs text-gray-500 block mb-2">
              {showFormattedDate(note.createdAt)}
            </time>
            <h3 className="text-lg font-bold text-gray-900 truncate">{note.title}</h3>
          </div>
          <div className="flex gap-1 ml-2 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note);
              }}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-all"
              title="Edit"
              aria-label="Edit note"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onArchive(note.id);
              }}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-all"
              title={note.archived ? "Unarchive" : "Archive"}
              aria-label={note.archived ? "Unarchive note" : "Archive note"}
            >
              {note.archived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-all"
              title="Delete"
              aria-label="Delete note"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-gray-700 leading-relaxed overflow-hidden" 
             style={{ 
               display: '-webkit-box', 
               WebkitLineClamp: 6, 
               WebkitBoxOrient: 'vertical' 
             }}>
            {note.body}
          </p>
        </div>
      </article>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-10 bg-white rounded-lg p-6 shadow-2xl w-full max-w-sm animate-scale-in">
            <h4 id="modal-title" className="text-xl font-bold mb-3 text-gray-900">
              Delete Confirmation
            </h4>
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all font-medium border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
