import { LOCAL_STORAGE_KEY } from "./constants";

export function loadNotesFromStorage() {
  try {
    const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : null;
    return Array.isArray(parsedNotes) ? parsedNotes : null;
  } catch (error) {
    console.error("Failed to parse notes from localStorage", error);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return null;
  }
}

export function saveNotesToStorage(notes) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}
