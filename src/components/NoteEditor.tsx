import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { NoteModel } from "../types";
import { blocksToPlainText } from "../utils/blocks";
import BlockEditor from "./BlockEditor";

interface NoteEditorProps {
  note: NoteModel;
  onSave: (note: NoteModel) => void;
  onClose: () => void;
}

export default function NoteEditor({ note, onSave, onClose }: NoteEditorProps) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [blocks, setBlocks] = useState(note.blocks);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    setTitle(note.title);
    setBlocks(note.blocks);
  }, [note]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 200);
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const isSaveDisabled = blocksToPlainText(blocks).length === 0;

  const handleSave = () => {
    if (isSaveDisabled) return;
    onSave({ ...note, title: title.trim() || "Untitled", blocks });
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[color:var(--color-overlay)] backdrop-blur-sm transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onMouseDown={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`editor-modal w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-200 ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="heading-modal">Edit note</h2>
            <p className="text-sm text-[color:var(--color-text-muted)]">
              Update blocks, lists, or code. Changes save only when you click Save
              changes.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] text-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-surface"
              placeholder="Note title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
              Blocks
            </label>
            <BlockEditor blocks={blocks} onChange={setBlocks} />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaveDisabled}
              className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Save changes
            </button>
            <button onClick={handleClose} className="btn-ghost flex-1">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
