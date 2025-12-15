import { Archive, Notebook, Plus, TrendingUp } from "lucide-react";

export default function Sidebar({ onAddNote, onShowArchived, showArchived, notesCount }) {
  return (
    <aside className="w-[22%] h-[100%] bg-white border-r border-gray-200 p-7 hidden lg:block fixed shadow-sm">
      <div className="mb-14 mt-2 text-center animate-fade-in">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          &lt; NioNotes /&gt;
        </h1>
        <p className="text-xs text-gray-500 font-medium">Your digital notepad</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onAddNote}
          className="w-full flex items-center justify-center gap-2 p-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-medium"
        >
          <Plus size={20} />
          <span>Add New Note</span>
        </button>
        
        <div className="pt-2 space-y-2">
          <button
            onClick={() => onShowArchived(false)}
            className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-xl transition-all font-medium ${
              !showArchived
                ? "bg-blue-50 text-blue-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Notebook size={20} />
              <span>My Notes</span>
            </div>
            {notesCount?.active !== undefined && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                !showArchived ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
              }`}>
                {notesCount.active}
              </span>
            )}
          </button>
          
          <button
            onClick={() => onShowArchived(true)}
            className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-xl transition-all font-medium ${
              showArchived
                ? "bg-purple-50 text-purple-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Archive size={20} />
              <span>Archived</span>
            </div>
            {notesCount?.archived !== undefined && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                showArchived ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
              }`}>
                {notesCount.archived}
              </span>
            )}
          </button>
        </div>

        <div className="pt-6 mt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <TrendingUp size={16} />
            <span className="font-medium">Quick Stats</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Total Notes</span>
              <span className="font-semibold">{(notesCount?.active || 0) + (notesCount?.archived || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
