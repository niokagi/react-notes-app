import NoteItem from "./NoteItem";
import { FileText, Archive } from "lucide-react";

export default function NotesList({
  notes,
  onDelete,
  onArchive,
  onEdit,
  showArchived,
}) {
  return notes.length ? (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
          onEdit={onEdit}
        />
      ))}
    </div>
  ) : (
    <div className="text-center py-20 w-full">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-8 rounded-full border-2 border-gray-300">
          {showArchived ? (
            <Archive size={48} className="text-gray-500" />
          ) : (
            <FileText size={48} className="text-gray-500" />
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {showArchived ? "No Archived Notes" : "No Notes Yet"}
      </h3>
      <p className="text-gray-600">
        {showArchived
          ? "Archive notes to see them here"
          : "Start creating your first note!"}
      </p>
    </div>
  );
}
