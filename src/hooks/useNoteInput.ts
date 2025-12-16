import { useState } from "react";
import { NoteBlock, NoteModel } from "../types";
import { blocksToPlainText, createBlock } from "../utils/blocks";

const MAX_TITLE_LENGTH = 50;

interface UseNoteInputProps {
  addNote: (note: NoteModel) => void;
  onClose: () => void;
}

export function useNoteInput({ addNote, onClose }: UseNoteInputProps) {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<NoteBlock[]>([
    createBlock("paragraph"),
  ]);

  const onTitleChangeHandler = (value: string) => {
    if (value.length <= MAX_TITLE_LENGTH) {
      setTitle(value);
    }
  };

  const onBlocksChange = (nextBlocks: NoteBlock[]) => {
    setBlocks(nextBlocks);
  };

  const onSubmit = () => {
    const trimmedTitle = title.trim() || "Untitled";
    const serializedBody = blocksToPlainText(blocks);
    if (!serializedBody.length) return;

    addNote({
      id: +new Date(),
      title: trimmedTitle,
      blocks,
      archived: false,
      createdAt: new Date().toISOString(),
    });
    setTitle("");
    setBlocks([createBlock("paragraph")]);
    onClose();
  };

  const remainingChars = MAX_TITLE_LENGTH - title.length;

  return {
    title,
    blocks,
    remainingChars,
    onTitleChangeHandler,
    onBlocksChange,
    onSubmit,
  };
}
