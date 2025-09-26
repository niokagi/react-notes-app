export default function SearchBar({ keyword, keywordChange }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search for a notes..."
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
        className="search-bar"
      />
    </div>
  );
}
