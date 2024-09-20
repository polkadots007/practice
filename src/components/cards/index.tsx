import { useNavigate } from "react-router-dom";
import { NoteType } from "../types";
import * as ROUTES from "../../constants/routes";
import { DownIcon, EditIcon, ViewIcon } from "../../helpers/Icons";
import { useState } from "react";

interface NotesListProps {
  note: NoteType; // `data` prop is of `NoteType`
  updateStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card = ({ note, updateStatus }: NotesListProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const navigate = useNavigate();
  function clickNote(
    //   event: MouseEventHandler<HTMLDivElement>,
    noteId: number,
    updateStatus: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    // navigate(ROUTES.EDIT, { state: note });
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
        onClick={(_event: React.MouseEventHandler<HTMLDivElement>) =>
          clickNote(note.id, updateStatus)
        }
      >
        <span className="circle"></span>
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
