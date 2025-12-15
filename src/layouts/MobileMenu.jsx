import { Plus } from "lucide-react";

export default function MobileMenu({
  onAddNote,
  onShowArchived,
  showArchived,
}) {
  return (
    <div className="lg:hidden animate-fade-in">
      <button
        onClick={onAddNote}
        className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all mb-4 shadow-lg font-medium"
      >
        <Plus size={20} />
        <span>Add New Note</span>
      </button>
      <div className="flex gap-2">
        <button
          onClick={() => onShowArchived(false)}
          className={`flex-1 py-3 px-4 rounded-xl transition-all font-medium ${
            !showArchived
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          My Notes
        </button>
        <button
          onClick={() => onShowArchived(true)}
          className={`flex-1 py-3 px-4 rounded-xl transition-all font-medium ${
            showArchived
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Archived
        </button>
      </div>
    </div>
  );
}
