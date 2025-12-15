import { Archive, Notebook, Plus, BarChart3 } from "lucide-react";

export default function Sidebar({ onAddNote, onShowArchived, showArchived, notesCount }) {
  return (
    <aside className="w-[280px] h-screen bg-white border-r-2 border-gray-200 p-6 hidden lg:flex lg:flex-col fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
          &lt; NioNotes /&gt;
        </h1>
        <p className="text-xs text-gray-600 text-center font-medium">
          Your digital notepad
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <button
          onClick={onAddNote}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium border-2 border-gray-900"
        >
          <Plus size={20} />
          <span>Add New Note</span>
        </button>
        
        <nav className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => onShowArchived(false)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all font-medium border-2 ${
              !showArchived
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-center gap-3">
              <Notebook size={20} />
              <span>My Notes</span>
            </div>
            {notesCount?.active !== undefined && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                !showArchived ? "bg-white text-gray-900" : "bg-gray-200 text-gray-700"
              }`}>
                {notesCount.active}
              </span>
            )}
          </button>
          
          <button
            onClick={() => onShowArchived(true)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all font-medium border-2 ${
              showArchived
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-center gap-3">
              <Archive size={20} />
              <span>Archived</span>
            </div>
            {notesCount?.archived !== undefined && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                showArchived ? "bg-white text-gray-900" : "bg-gray-200 text-gray-700"
              }`}>
                {notesCount.archived}
              </span>
            )}
          </button>
        </nav>

        <div className="pt-4 mt-4 border-t-2 border-gray-200">
          <div className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-3">
            <BarChart3 size={16} />
            <span>Statistics</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Total Notes</span>
              <span className="text-2xl font-bold text-gray-900">
                {(notesCount?.active || 0) + (notesCount?.archived || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
