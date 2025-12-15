import { useState, useEffect } from "react";

const MAX_TITLE_LENGTH = 50;

export function useNoteInput({ addNote, editNote, noteToEdit, onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setBody(noteToEdit.body);
    }
  }, [noteToEdit]);

  const onTitleChangeHandler = (e) => {
    if (e.target.value.length <= MAX_TITLE_LENGTH) {
      setTitle(e.target.value);
    }
  };

  const onBodyChangeHandler = (e) => {
    setBody(e.target.value);
  };

  const onSubmit = () => {
    if (title.trim() && body.trim()) {
      if (noteToEdit) {
        editNote({
          ...noteToEdit,
          title: title.trim(),
          body: body.trim(),
        });
      } else {
        addNote({
          id: +new Date(),
          title: title.trim(),
          body: body.trim(),
          archived: false,
          createdAt: new Date().toISOString(),
        });
      }
      setTitle("");
      setBody("");
      onClose();
    }
  };

  const remainingChars = MAX_TITLE_LENGTH - title.length;

  return {
    title,
    body,
    remainingChars,
    onTitleChangeHandler,
    onBodyChangeHandler,
    onSubmit,
  };
}
