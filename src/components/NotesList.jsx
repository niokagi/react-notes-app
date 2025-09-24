import NoteItem from "./NoteItem";

export default function NotesList({
  notes,
  onDelete,
  onArchive,
  showArchived,
}) {
  return notes.length ? (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </div>
  ) : (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">
        {showArchived ? "No archived notes" : "No notes available"}
      </p>
    </div>
  );
}
