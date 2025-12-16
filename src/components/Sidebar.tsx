import { Archive, Notebook } from "lucide-react";

interface SidebarProps {
  onAddNote: () => void;
  onShowArchived: (value: boolean) => void;
  showArchived: boolean;
}

export default function Sidebar({
  onAddNote,
  onShowArchived,
  showArchived,
}: SidebarProps) {
  return (
    <aside className="sidebar-shell">
      <h1 className="text-2xl font-bold text-[color:var(--color-text)] mb-10 mt-2 text-center">
        &lt; NioNotes /&gt;
      </h1>

      <div className="space-y-3">
        <button onClick={onAddNote} className="btn-ghost w-full">
          <span className="text-xl">+</span>
          <span>New Note</span>
        </button>
        <button
          onClick={() => onShowArchived(false)}
          className={`nav-chip ${!showArchived ? "active" : ""}`}
        >
          <Notebook size={15} />
          <span>My Notes</span>
        </button>
        <button
          onClick={() => onShowArchived(true)}
          className={`nav-chip ${showArchived ? "active" : ""}`}
        >
          <Archive size={15} />
          <span>Archived</span>
        </button>
      </div>
    </aside>
  );
}
