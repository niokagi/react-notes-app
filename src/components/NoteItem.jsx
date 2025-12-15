import { useState } from "react";
import { Archive, ArchiveRestore, Trash2, Edit2 } from "lucide-react";
import { showFormattedDate } from "../data/data";

export default function NoteItem({ note, onDelete, onArchive, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleDelete = () => {
    setShowModal(false);
    onDelete(note.id);
  };

  const noteColors = [
    "bg-gradient-to-br from-slate-800 to-slate-900",
    "bg-gradient-to-br from-blue-900 to-blue-950",
    "bg-gradient-to-br from-purple-900 to-purple-950",
    "bg-gradient-to-br from-green-900 to-green-950",
    "bg-gradient-to-br from-orange-900 to-orange-950",
  ];

  const colorIndex = note.id % noteColors.length;
  const bgColor = noteColors[colorIndex];

  return (
    <>
      <div 
        className={`${bgColor} text-white rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer animate-fade-in relative overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="text-xs text-gray-300 mb-2 flex items-center gap-2">
            <span>{showFormattedDate(note.createdAt)}</span>
          </div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <div className={`flex gap-2 ml-4 flex-shrink-0 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(note);
                }}
                className="text-blue-300 hover:text-blue-100 transition-colors p-1 hover:bg-white/10 rounded"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive(note.id);
                }}
                className="text-gray-300 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                title={note.archived ? "Unarchive" : "Archive"}
              >
                {note.archived ? <ArchiveRestore size={18} /> : <Archive size={18} />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="text-red-400 hover:text-red-300 transition-colors p-1 hover:bg-white/10 rounded"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed line-clamp-4">{note.body}</p>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-all animate-fade-in"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-10 bg-white rounded-2xl p-6 shadow-2xl w-[90vw] max-w-sm transition-all duration-300 scale-100 animate-scale-in">
            <h4 className="text-xl font-bold mb-3 text-gray-900">
              Delete Confirmation
            </h4>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all font-medium shadow-lg hover:shadow-xl"
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
