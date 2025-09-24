import { useState } from "react";
import { Archive, ArchiveRestore, Trash2 } from "lucide-react";
import { showFormattedDate } from "../data/data";

export default function NoteItem({ note, onDelete, onArchive }) {
  const [showModal, setShowModal] = useState(false);
  const handleDelete = () => {
    setShowModal(false);
    onDelete(note.id);
  };

  return (
    <>
      <div className="bg-slate-800 text-white rounded-lg p-6">
        <div className="text-xs text-gray-300 mb-2">
          {showFormattedDate(note.createdAt)}
        </div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium">{note.title}</h3>
          <div className="flex gap-2 ml-4 flex-shrink-0">
            <button
              onClick={() => onArchive(note.id)}
              className="text-gray-300 hover:text-white transition-colors"
              title={note.archived ? "Unarchive" : "Archive"}
            >
              {note.archived ? <ArchiveRestore /> : <Archive />}
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="text-red-400 hover:text-red-300 transition-colors"
              title="Delete"
            >
              <Trash2 />
            </button>
          </div>
        </div>
        <p className="text-gray-200 text-sm leading-relaxed">{note.body}</p>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-all"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-10 bg-white rounded-xl p-6 shadow-lg w-[90vw] max-w-sm transition-all duration-300 scale-100">
            <h4 className="text-lg font-semibold mb-2 text-black">
              Konfirmasi Hapus
            </h4>
            <p className="text-black mb-4 text-sm">
              Apakah Anda yakin ingin menghapus catatan ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200 text-black hover:bg-gray-300 transition"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-400 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
