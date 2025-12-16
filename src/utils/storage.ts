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
  const hasBlocks = Array.isArray(candidate.blocks);
  const blocks = hasBlocks
    ? candidate.blocks
    : normalizeBlocksFromBody(typeof candidate.body === "string" ? candidate.body : "");

  return {
    id: typeof candidate.id === "number" ? candidate.id : Date.now(),
    title: typeof candidate.title === "string" ? candidate.title : "Untitled",
    archived: Boolean(candidate.archived),
    createdAt:
      typeof candidate.createdAt === "string"
        ? candidate.createdAt
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
