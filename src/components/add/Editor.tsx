import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import EmojiPicker from "emoji-picker-react";
import { NoteType } from "../types";
import {
  CREATE_NOTE_ENDPOINT,
  GET_MAXID_ENDPOINT,
} from "../../constants/endpoints";

interface EditorProps {
  note?: NoteType;
  handleDiscard: (
    clearData: React.Dispatch<React.SetStateAction<string>>,
    clearTitle: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  addNoteData: (url: string, newNote: NoteType) => Promise<void>;
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

const TextEditor = ({ note, handleDiscard, addNoteData }: EditorProps) => {
  const [value, setValue] = useState<string>(note?.description ?? "");
  const [title, setTitle] = useState<string>(note?.title ?? "");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const handleAddNote = async (
    title: string,
    value: string,
    addNoteData: (url: string, newNote: NoteType) => Promise<void>
  ) => {
    await fetch(GET_MAXID_ENDPOINT)
      .then((response: Response) => response.json())
      .then(async (id: number) => {
        await addNoteData(CREATE_NOTE_ENDPOINT, {
          id: (id ?? 0) + 1,
          title: title,
          description: value,
          status: "Incomplete",
        });
      })
      .catch((error: Error) => {
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
            onClick={() => handleAddNote(title, value, addNoteData)}
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
