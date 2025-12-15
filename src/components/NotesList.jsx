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
    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3 w-full">
      {notes.map((note, index) => (
        <div
          key={note.id}
          style={{ animationDelay: `${index * 0.05}s` }}
          className="animate-fade-in"
        >
          <NoteItem
            note={note}
            onDelete={onDelete}
            onArchive={onArchive}
            onEdit={onEdit}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-20 w-full animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-6 rounded-full">
          {showArchived ? (
            <Archive size={48} className="text-gray-400" />
          ) : (
            <FileText size={48} className="text-gray-400" />
          )}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        {showArchived ? "No Archived Notes" : "No Notes Yet"}
      </h3>
      <p className="text-gray-500">
        {showArchived
          ? "Archive notes to see them here"
          : "Start creating your first note!"}
      </p>
    </div>
  );
}
