import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import EmojiPicker from "emoji-picker-react";
import { NoteType, UpdatedNoteType } from "../types";
import { UPDATE_NOTE_ENDPOINT } from "../../constants/endpoints";

interface EditorProps {
  note?: NoteType;
  handleDiscard: (
    clearData: React.Dispatch<React.SetStateAction<string>>,
    clearTitle: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  updateNote: (url: string, updatedNote: NoteType) => Promise<void>;
}
// Add fonts and highlight modules
const Font = Quill.import("formats/font");
Font.whitelist = ["sans-serif", "serif", "monospace", "roboto"];
Quill.register(Font, true);

const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    // ["emoji"],
    // ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "emoji",
];

const TextEditor = ({ note, handleDiscard, updateNote }: EditorProps) => {
  const id: number = note?.id ?? "";
  const [value, setValue] = useState<string>(note?.description ?? "");
  const [title, setTitle] = useState<string>(note?.title ?? "");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const handleUpdateNote = async (
    title: string,
    value: string,
    updateNote: (url: string, newNote: NoteType) => Promise<void>
  ) => {
    await updateNote(UPDATE_NOTE_ENDPOINT + id, {
      title: title,
      description: value,
    }).catch((error: Error) => {
      console.error(error);
    });
  };

  const handleEmojiClick = (emoji: { emoji: string }) => {
    setValue((prevValue) => prevValue + emoji.emoji);
  };

  return (
    <div className="editor-container">
      <div className="editor-title">
        <ReactQuill
          value={title}
          onChange={setTitle}
          modules={{ toolbar: false }} // Disable toolbar by setting modules to false
          placeholder="Caption this..."
        />
      </div>
      <div className="editor-toolbar">
        <span className="emoji-btn">
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            😊
          </button>
          {showEmojiPicker && (
            <div
              className={`emoji-picker-wrapper ${
                showEmojiPicker ? "visible" : ""
              }`}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </span>
        <ReactQuill
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          placeholder="Write something..."
        />
      </div>
      {note?.status !== "Complete" ? (
        <div className="editor-action-btn">
          <button
            className={`save-btn button-primary ${
              !value.length && !title.length ? "disabled-btn" : "enabled-btn"
            }`}
            onClick={() => handleUpdateNote(title, value, updateNote)}
          >
            {" "}
            Save{" "}
          </button>
          <button
            className={`cancel-btn button-accent ${
              value.length && title.length && "enabled-btn"
            }`}
            onClick={() => handleDiscard(setValue, setTitle)}
          >
            {" "}
            Discard Changes{" "}
          </button>
        </div>
      ) : (
        <div className="view-btn">
          <button
            className={`cancel-btn button-primary`}
            onClick={() => handleDiscard(setValue, setTitle)}
          >
            {" "}
            Back{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
