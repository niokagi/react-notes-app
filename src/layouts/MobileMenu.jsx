import { Plus } from "lucide-react";

export default function MobileMenu({
  onAddNote,
  onShowArchived,
  showArchived,
}) {
  return (
    <div className="lg:hidden">
      <button
        onClick={onAddNote}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all mb-4 font-medium border-2 border-gray-900"
      >
        <Plus size={20} />
        <span>Add New Note</span>
      </button>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onShowArchived(false)}
          className={`py-3 px-4 rounded-lg transition-all font-medium border-2 ${
            !showArchived
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          My Notes
        </button>
        <button
          onClick={() => onShowArchived(true)}
          className={`py-3 px-4 rounded-lg transition-all font-medium border-2 ${
            showArchived
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          Archived
        </button>
      </div>
    </div>
  );
}
