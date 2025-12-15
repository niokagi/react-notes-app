import { useState, useEffect } from "react";
import { getInitialData } from "../data/data";
import { loadNotesFromStorage, saveNotesToStorage } from "../utils/storage";

const initialNotesData = getInitialData();

export function useNotes() {
  const [notes, setNotes] = useState(() => {
    const notesFromStorage = loadNotesFromStorage();
    return (
      notesFromStorage ||
      (Array.isArray(initialNotesData) ? initialNotesData : [])
    );
  });

  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const editNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const archiveNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  return { notes, addNote, editNote, deleteNote, archiveNote };
}
