import { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import NotesList from "./components/NotesList";
import NoteInput from "./components/NoteInput";
import MobileMenu from "./layouts/MobileMenu";
import Footer from "./layouts/Footer";
import { useNotes } from "./hooks/useNotes";
import MobileNav from "./layouts/MobileNav";

export default function App() {
  const { notes, addNote, deleteNote, archiveNote } = useNotes();
  const [keyword, setKeyword] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesKeyword = note.title
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchesArchiveStatus = note.archived === showArchived;
      return matchesKeyword && matchesArchiveStatus;
    });
  }, [notes, keyword, showArchived]);

  return (
    <>
      <Sidebar
        onAddNote={() => setShowAddModal(true)}
        onShowArchived={setShowArchived}
        showArchived={showArchived}
      />

      <main className="flex-1 flex flex-col lg:w-[78%] lg:absolute lg:right-0">
        <MobileNav />
        <div className="flex-1 p-4 lg:p-8 min-h-[100vh]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {showArchived ? "Archived Notes" : "My Notes"}
              </h2>
              <p className="text-gray-600 mb-6">
                {showArchived
                  ? "Here is a collection of your archived notes."
                  : "Here is a collection of your active notes"}
              </p>

              <SearchBar
                keyword={keyword}
                keywordChange={onKeywordChangeHandler}
              />
              <MobileMenu
                onAddNote={() => setShowAddModal(true)}
                onShowArchived={setShowArchived}
                showArchived={showArchived}
              />
            </div>

            <NotesList
              notes={filteredNotes}
              onDelete={deleteNote}
              onArchive={archiveNote}
              showArchived={showArchived}
            />
          </div>
        </div>
        <Footer />
      </main>

      {showAddModal && (
        <NoteInput addNote={addNote} onClose={() => setShowAddModal(false)} />
      )}
    </>
  );
}
