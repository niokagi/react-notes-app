interface SearchBarProps {
  keyword: string;
  keywordChange: (value: string) => void;
}

export default function SearchBar({ keyword, keywordChange }: SearchBarProps) {
  return (
    <div className="mb-4 w-full">
      <input
        type="text"
        placeholder="Search notes or blocks..."
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
        className="search-bar"
      />
    </div>
  );
}
