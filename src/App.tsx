import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import NotesList from "./components/NotesList";
import NoteInput from "./components/NoteInput";
import MobileMenu from "./layouts/MobileMenu";
import Footer from "./layouts/Footer";
import { useNotes } from "./hooks/useNotes";
import MobileNav from "./layouts/MobileNav";
import { blocksToPlainText } from "./utils/blocks";

export default function App() {
  const { notes, addNote, deleteNote, archiveNote } = useNotes();
  const [keyword, setKeyword] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const haystack = `${note.title} ${blocksToPlainText(note.blocks)}`.toLowerCase();
      const matchesKeyword = haystack.includes(keyword.toLowerCase());
      const matchesArchiveStatus = note.archived === showArchived;
      return matchesKeyword && matchesArchiveStatus;
    });
  }, [notes, keyword, showArchived]);

  return (
    <div className="app-shell">
      <Sidebar
        onAddNote={() => setShowAddModal(true)}
        onShowArchived={setShowArchived}
        showArchived={showArchived}
      />
      <main className="flex-1 flex flex-col max-lg:w-full lg:w-[78%] lg:absolute lg:right-0">
        <MobileNav />
        <div className="flex-1 p-5 lg:p-10 min-h-[100dvh]">
          <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
            <div className="surface-card p-6 rounded-2xl">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm text-[color:var(--color-text-muted)] mb-1">
                    Block-Based Editor
                  </p>
                  <h2 className="text-3xl font-bold text-[color:var(--color-text)]">
                    Build ideas with blocks
                  </h2>
                  <p className="text-[color:var(--color-text-subtle)] max-w-2xl mt-2">
                    Create headings, paragraphs, lists, and code snippets. Use{" "}
                    <code className="px-1 rounded bg-[color:var(--color-surface-subtle)]">/</code>{" "}
                    to summon the command palette while typing.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn-primary"
                >
                  New note
                </button>
              </div>
              <div className="mt-6">
                <SearchBar keyword={keyword} keywordChange={setKeyword} />
                <MobileMenu
                  onAddNote={() => setShowAddModal(true)}
                  onShowArchived={setShowArchived}
                  showArchived={showArchived}
                />
              </div>
            </div>

            <NotesList
              notes={filteredNotes}
              onDelete={deleteNote}
              onArchive={archiveNote}
              showArchived={showArchived}
              onAddNote={() => setShowAddModal(true)}
            />
          </div>
        </div>
        <Footer />
      </main>
      {showAddModal && (
        <NoteInput addNote={addNote} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
