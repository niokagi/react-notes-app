import { useEffect, useState } from "react";
import { getInitialData } from "../data/data";
import { NoteModel } from "../types";
import { loadNotesFromStorage, saveNotesToStorage } from "../utils/storage";

const initialNotesData = getInitialData();

export function useNotes() {
  const [notes, setNotes] = useState<NoteModel[]>(() => {
    const notesFromStorage = loadNotesFromStorage();
    return (
      notesFromStorage ||
      (Array.isArray(initialNotesData) ? initialNotesData : [])
    );
  });

  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  const addNote = (newNote: NoteModel) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const updateNote = (
    id: number,
    updater: ((note: NoteModel) => NoteModel) | NoteModel
  ) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id !== id) return note;
        const next = typeof updater === "function" ? updater(note) : updater;
        return next;
      })
    );
  };

  const deleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const archiveNote = (id: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  return { notes, addNote, deleteNote, archiveNote, updateNote };
}
