import { Search } from "lucide-react";

export default function SearchBar({ keyword, keywordChange }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
        <Search size={20} />
      </div>
      <input
        type="text"
        placeholder="Search notes by title..."
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
        className="search-bar pl-12"
        aria-label="Search notes"
      />
    </div>
  );
}
