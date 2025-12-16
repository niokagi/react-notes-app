import { useMemo, useState } from "react";
import { Archive, ArchiveRestore, Code2, Pencil, Trash2 } from "lucide-react";
import { showFormattedDate } from "../data/data";
import { NoteModel } from "../types";

interface NoteItemProps {
  note: NoteModel;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  onEdit: () => void;
}

const BlockPreview = ({ block }: { block: NoteModel["blocks"][number] }) => {
  if (block.type === "heading") {
    return (
      <h4 className="text-lg font-semibold text-white mb-1 leading-tight">
        {block.text}
      </h4>
    );
  }

  if (block.type === "bullet" || block.type === "numbered") {
    return (
      <ul className="pl-5 text-sm text-gray-100 space-y-1 list-disc">
        {(block.items || []).slice(0, 4).map((item, index) => (
          <li key={`${block.id}-${index}`}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "code") {
    return (
      <pre className="bg-[color:var(--color-surface-strong)] border border-[color:var(--color-border)] text-gray-100 text-xs rounded-md p-3 overflow-x-auto">
        <Code2 size={14} className="inline mr-2 text-gray-300" />
        <code>{block.text}</code>
      </pre>
    );
  }

  return <p className="text-sm text-gray-100 leading-relaxed">{block.text}</p>;
};

export default function NoteItem({ note, onDelete, onArchive, onEdit }: NoteItemProps) {
  const [showModal, setShowModal] = useState(false);
  const blocks = note.blocks || [];
  const handleDelete = () => {
    setShowModal(false);
    onDelete(note.id);
  };

  const badges = useMemo(
    () => Array.from(new Set(blocks.map((block) => block.type))).slice(0, 3),
    [blocks]
  );

  return (
    <>
      <div className="note-card">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-xs text-gray-300">
              {showFormattedDate(note.createdAt)}
            </p>
            <h3 className="text-xl font-semibold text-white">{note.title}</h3>
          </div>
          <div className="flex gap-2">
            <button onClick={onEdit} className="icon-button" title="Edit">
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onArchive(note.id)}
              className="icon-button"
              title={note.archived ? "Unarchive" : "Archive"}
            >
              {note.archived ? <ArchiveRestore size={18} /> : <Archive size={18} />}
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="icon-button danger"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-2 py-1 text-xs rounded-full bg-[color:var(--color-surface-subtle)] text-gray-100 capitalize border border-[color:var(--color-border)]"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          {blocks.slice(0, 3).map((block) => (
            <BlockPreview key={block.id} block={block} />
          ))}
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-all"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-[color:var(--color-overlay)] backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-10 bg-[color:var(--color-surface)] rounded-xl p-6 shadow-soft w-[90vw] max-w-sm transition-all duration-300 scale-100 border border-[color:var(--color-border)]">
            <h4 className="text-lg font-semibold mb-2 text-[color:var(--color-text)]">
              Delete note?
            </h4>
            <p className="text-[color:var(--color-text-subtle)] mb-4 text-sm">
              This action cannot be undone. The note will be permanently removed.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="btn-ghost">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
