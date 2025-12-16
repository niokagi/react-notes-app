import { NoteModel } from "../types";
import { normalizeBlocksFromBody } from "./blocks";
import { LOCAL_STORAGE_KEY } from "./constants";

type LegacyNote = {
  id?: number;
  title?: string;
  archived?: boolean;
  createdAt?: string;
  body?: string;
  blocks?: NoteModel["blocks"];
};

const normalizeNoteShape = (note: unknown): NoteModel | null => {
  if (!note || typeof note !== "object") return null;
  const candidate = note as LegacyNote;
  const hasBlocks = Array.isArray(note.blocks);
  const blocks = hasBlocks
    ? note.blocks
    : normalizeBlocksFromBody(typeof note.body === "string" ? note.body : "");

  return {
    id: typeof note.id === "number" ? note.id : Date.now(),
    title: typeof note.title === "string" ? note.title : "Untitled",
    archived: Boolean(note.archived),
    createdAt:
      typeof note.createdAt === "string"
        ? note.createdAt
        : new Date().toISOString(),
    blocks,
  };
};

export function loadNotesFromStorage(): NoteModel[] | null {
  try {
    const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : null;
    if (!Array.isArray(parsedNotes)) return null;
    const normalized = parsedNotes
      .map((note) => normalizeNoteShape(note))
      .filter(Boolean) as NoteModel[];
    return normalized.length ? normalized : null;
  } catch (error) {
    console.error("Failed to parse notes from localStorage", error);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return null;
  }
}

export function saveNotesToStorage(notes: NoteModel[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}
