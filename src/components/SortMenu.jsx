import { ArrowUpDown, SortAsc, SortDesc, Calendar } from "lucide-react";
import { useState } from "react";

export default function SortMenu({ onSortChange, currentSort }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "newest", label: "Newest First", icon: SortDesc },
    { value: "oldest", label: "Oldest First", icon: SortAsc },
    { value: "title", label: "Title (A-Z)", icon: SortAsc },
  ];

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  const currentOption = sortOptions.find((opt) => opt.value === currentSort);
  const Icon = currentOption?.icon || ArrowUpDown;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 shadow-sm"
      >
        <Icon size={16} />
        <span className="hidden sm:inline">Sort</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20 animate-scale-in">
            {sortOptions.map((option) => {
              const OptionIcon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    currentSort === option.value
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <OptionIcon size={16} />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
