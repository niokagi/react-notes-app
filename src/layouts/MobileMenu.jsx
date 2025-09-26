export default function MobileMenu({
  onAddNote,
  onShowArchived,
  showArchived,
}) {
  return (
    <>
      <button
        onClick={onAddNote}
        className="!w-full flex items-center justify-center gap-2 p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors mb-5"
      >
        <span className="text-xl">+</span>
        <span>Add Note</span>
      </button>
      <div className="flex gap-2">
        <button
          onClick={() => onShowArchived(false)}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            !showArchived
              ? "bg-gray-300 text-black"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          My Notes
        </button>
        <button
          onClick={() => onShowArchived(true)}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            showArchived
              ? "bg-gray-300 text-black"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Archived
        </button>
      </div>
    </>
  );
}
