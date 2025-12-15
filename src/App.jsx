import { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import NotesList from "./components/NotesList";
import NoteInput from "./components/NoteInput";
import MobileMenu from "./layouts/MobileMenu";
import Footer from "./layouts/Footer";
import Toast from "./components/Toast";
import { useNotes } from "./hooks/useNotes";
import MobileNav from "./layouts/MobileNav";

export default function App() {
  const { notes, addNote, editNote, deleteNote, archiveNote } = useNotes();
  const [keyword, setKeyword] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
  };

  const handleAddNote = (note) => {
    addNote(note);
    showToast("Note created successfully!", "success");
  };

  const handleEditNote = (note) => {
    editNote(note);
    showToast("Note updated successfully!", "success");
    setNoteToEdit(null);
  };

  const handleDeleteNote = (id) => {
    deleteNote(id);
    showToast("Note deleted", "info");
  };

  const handleArchiveNote = (id) => {
    const note = notes.find((n) => n.id === id);
    archiveNote(id);
    showToast(
      note?.archived ? "Note unarchived" : "Note archived",
      "info"
    );
  };

  const handleEditClick = (note) => {
    setNoteToEdit(note);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNoteToEdit(null);
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

  const notesCount = useMemo(() => {
    return {
      active: notes.filter((n) => !n.archived).length,
      archived: notes.filter((n) => n.archived).length,
    };
  }, [notes]);

  return (
    <>
      <Sidebar
        onAddNote={() => setShowAddModal(true)}
        onShowArchived={setShowArchived}
        showArchived={showArchived}
        notesCount={notesCount}
      />
      <main className="flex-1 flex flex-col max-lg:w-full lg:w-[78%] lg:absolute lg:right-0">
        <MobileNav />
        <div className="flex-1 p-5 lg:p-8 min-h-[100dvh]">
          <div className="max-w-7xl mx-auto w-full flex flex-col">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1 sm:mt-2 animate-fade-in">
                    {showArchived ? "📦 Archived Notes" : "📝 My Notes"}
                  </h2>
                  <p className="text-gray-600 animate-fade-in">
                    {showArchived
                      ? "Browse your archived notes"
                      : "Manage your active notes"}
                  </p>
                </div>
                <div className="hidden sm:block animate-fade-in">
                  <div className="bg-white rounded-xl px-6 py-3 shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Total Notes</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {filteredNotes.length}
                    </div>
                  </div>
                </div>
              </div>
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
              onDelete={handleDeleteNote}
              onArchive={handleArchiveNote}
              onEdit={handleEditClick}
              showArchived={showArchived}
            />
          </div>
        </div>
        <Footer />
      </main>
      {showAddModal && (
        <NoteInput
          addNote={handleAddNote}
          editNote={handleEditNote}
          noteToEdit={noteToEdit}
          onClose={handleCloseModal}
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
