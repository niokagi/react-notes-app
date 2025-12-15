import { useState, useMemo, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import NotesList from "./components/NotesList";
import NoteInput from "./components/NoteInput";
import MobileMenu from "./layouts/MobileMenu";
import Footer from "./layouts/Footer";
import Toast from "./components/Toast";
import SortMenu from "./components/SortMenu";
import { useNotes } from "./hooks/useNotes";
import MobileNav from "./layouts/MobileNav";

export default function App() {
  const { notes, addNote, editNote, deleteNote, archiveNote } = useNotes();
  const [keyword, setKeyword] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [toast, setToast] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
  }, []);

  const onKeywordChangeHandler = useCallback((keyword) => {
    setKeyword(keyword);
  }, []);

  const handleAddNote = useCallback((note) => {
    addNote(note);
    showToast("Note created successfully!");
  }, [addNote, showToast]);

  const handleEditNote = useCallback((note) => {
    editNote(note);
    showToast("Note updated successfully!");
    setNoteToEdit(null);
  }, [editNote, showToast]);

  const handleDeleteNote = useCallback((id) => {
    deleteNote(id);
    showToast("Note deleted");
  }, [deleteNote, showToast]);

  const handleArchiveNote = useCallback((id) => {
    const note = notes.find((n) => n.id === id);
    archiveNote(id);
    showToast(note?.archived ? "Note unarchived" : "Note archived");
  }, [notes, archiveNote, showToast]);

  const handleEditClick = useCallback((note) => {
    setNoteToEdit(note);
    setShowAddModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowAddModal(false);
    setNoteToEdit(null);
  }, []);

  const filteredAndSortedNotes = useMemo(() => {
    let filtered = notes.filter((note) => {
      const matchesKeyword = note.title
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchesArchiveStatus = note.archived === showArchived;
      return matchesKeyword && matchesArchiveStatus;
    });

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [notes, keyword, showArchived, sortBy]);

  const notesCount = useMemo(() => {
    return {
      active: notes.filter((n) => !n.archived).length,
      archived: notes.filter((n) => n.archived).length,
    };
  }, [notes]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        onAddNote={() => setShowAddModal(true)}
        onShowArchived={setShowArchived}
        showArchived={showArchived}
        notesCount={notesCount}
      />
      
      <main className="flex-1 flex flex-col lg:ml-[280px]">
        <MobileNav />
        
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto w-full">
            <header className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {showArchived ? "Archived Notes" : "My Notes"}
                  </h2>
                  <p className="text-gray-600">
                    {showArchived
                      ? "Browse your archived notes"
                      : "Manage your active notes"}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="bg-white rounded-lg px-6 py-4 border-2 border-gray-200">
                    <div className="text-xs text-gray-600 mb-1 font-medium">
                      Total Notes
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {filteredAndSortedNotes.length}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mb-6">
                <div className="flex-1">
                  <SearchBar
                    keyword={keyword}
                    keywordChange={onKeywordChangeHandler}
                  />
                </div>
                <SortMenu onSortChange={setSortBy} currentSort={sortBy} />
              </div>
              
              <MobileMenu
                onAddNote={() => setShowAddModal(true)}
                onShowArchived={setShowArchived}
                showArchived={showArchived}
              />
            </header>
            
            <NotesList
              notes={filteredAndSortedNotes}
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
    </div>
  );
}
