interface MobileMenuProps {
  onAddNote: () => void;
  onShowArchived: (value: boolean) => void;
  showArchived: boolean;
}

export default function MobileMenu({
  onAddNote,
  onShowArchived,
  showArchived,
}: MobileMenuProps) {
  return (
    <div className="sm:hidden">
      <button onClick={onAddNote} className="btn-ghost w-full mb-4">
        <span className="text-xl">+</span>
        <span>Add Note</span>
      </button>
      <div className="flex gap-2">
        <button
          onClick={() => onShowArchived(false)}
          className={`flex-1 chip ${!showArchived ? "active" : ""}`}
        >
          My Notes
        </button>
        <button
          onClick={() => onShowArchived(true)}
          className={`flex-1 chip ${showArchived ? "active" : ""}`}
        >
          Archived
        </button>
      </div>
    </div>
  );
}
