import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useNoteInput } from "../hooks/useNoteInput";
import { blocksToPlainText } from "../utils/blocks";
import BlockEditor from "./BlockEditor";
import { NoteModel } from "../types";

interface NoteInputProps {
  addNote: (note: NoteModel) => void;
  onClose: () => void;
}

export default function NoteInput({ addNote, onClose }: NoteInputProps) {
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 200);
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const {
    title,
    blocks,
    remainingChars,
    onTitleChangeHandler,
    onBlocksChange,
    onSubmit,
  } = useNoteInput({ addNote, onClose: handleClose });

  const isSubmitDisabled = blocksToPlainText(blocks).length === 0;

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
            <h2 className="text-xl font-semibold text-[color:var(--color-text)]">
              Block Editor
            </h2>
            <p className="text-sm text-[color:var(--color-text-muted)]">
              Type <code className="px-1 rounded bg-[color:var(--color-surface-subtle)]">
                /
              </code>{" "}
              for quick block commands.
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
              Title{" "}
              <span className="text-[color:var(--color-text-muted)]">
                ({remainingChars} characters left)
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => onTitleChangeHandler(e.target.value)}
              className="input-surface"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
              Blocks
            </label>
            <BlockEditor blocks={blocks} onChange={onBlocksChange} />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Save note
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
