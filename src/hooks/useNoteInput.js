import { useState } from "react";

const MAX_TITLE_LENGTH = 50;

export function useNoteInput({ addNote, onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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
      addNote({
        id: +new Date(),
        title: title.trim(),
        body: body.trim(),
        archived: false,
        createdAt: new Date().toISOString(),
      });
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
