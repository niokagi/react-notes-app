import { Archive, Notebook } from "lucide-react";

export default function Sidebar({ onAddNote, onShowArchived, showArchived }) {
  return (
    <aside className="w-[22%] h-[100%] bg-white border-r border-gray-200 p-7 hidden lg:block fixed">
      <h1 className="text-2xl font-bold text-gray-800 mb-14 mt-2 text-center">
        &lt; NioNotes /&gt;
      </h1>

      <div className="space-y-4">
        <button
          onClick={onAddNote}
          className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
        >
          <span className="text-xl">+</span>
          <span>Add Note</span>
        </button>
        <button
          onClick={() => onShowArchived(false)}
          className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
            !showArchived
              ? "bg-gray-100 text-gray-800"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span>
            <Notebook size={15} />
          </span>
          <span>My Notes</span>
        </button>
        <button
          onClick={() => onShowArchived(true)}
          className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
            showArchived
              ? "bg-gray-100 text-gray-800"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span>
            <Archive size={15} />
          </span>
          <span>Archived Notes</span>
        </button>
      </div>
    </aside>
  );
}
