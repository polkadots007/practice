import { useNavigate } from "react-router-dom";
import { NoteType } from "../types";
import * as ROUTES from "../../constants/routes";
import { DownIcon, EditIcon, ViewIcon } from "../../helpers/Icons";
import { useState } from "react";

interface NotesListProps {
  note: NoteType; // `data` prop is of `NoteType`
  updateSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

const Card = ({ note, updateSelected }: NotesListProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const navigate = useNavigate();
  function clickNote(
    //   event: MouseEventHandler<HTMLDivElement>,
    noteId: number,
    updateSelected: React.Dispatch<React.SetStateAction<number[]>>
  ) {
    // navigate(ROUTES.EDIT, { state: note });
    setClicked((prev: boolean) => !prev);
    updateSelected((prev: Array<number>) => {
      if (prev.includes(noteId)) {
        return prev.filter((id: number) => id !== noteId);
      } else {
        return [...prev, noteId];
      }
    });
  }
  function handleEdit(note: NoteType) {
    navigate(ROUTES.EDIT, { state: note });
  }
  return (
    <div
      className={`card ${
        note.status === "Complete" ? "complete" : "incomplete"
      }`}
    >
      <div
        className="card-content"
        onClick={() => clickNote(note?.id, updateSelected)}
      >
        <span className={`circle ${clicked && "checked"}`}></span>
      </div>
      <div className="card-label">
        <div className="label-text">{note.title}</div>
        <div className="down-arrow" onClick={() => handleEdit(note)}>
          {note.status !== "Complete" ? <EditIcon /> : <ViewIcon />}
        </div>
      </div>
    </div>
  );
};

export default Card;
