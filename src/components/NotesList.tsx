import { NoteModel } from "../types";
import NoteItem from "./NoteItem";

interface NotesListProps {
  notes: NoteModel[];
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  showArchived: boolean;
  onAddNote: () => void;
}

export default function NotesList({
  notes,
  onDelete,
  onArchive,
  showArchived,
  onAddNote,
}: NotesListProps) {
  if (!notes.length) {
    return (
      <div className="empty-state">
        <p className="text-lg text-[color:var(--color-text)] mb-1">
          {showArchived ? "No archived notes" : "Start with a new block note"}
        </p>
        <p className="text-[color:var(--color-text-muted)] mb-4">
          Draft in blocks, insert headings, lists, and code with slash commands.
        </p>
        <button onClick={onAddNote} className="btn-primary">
          Create note
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 w-full">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}
