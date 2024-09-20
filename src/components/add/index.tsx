import TextEditor from "./Editor";
import { NoteType } from "../types";
import * as ROUTES from "../../constants/routes";
import { useNavigate } from "react-router-dom";

interface AddNoteTypes {
  note?: NoteType;
}
const AddNoteComponent = ({ note }: AddNoteTypes) => {
  const navigate = useNavigate();
  const handleDiscard = (
    clearData: React.Dispatch<React.SetStateAction<string>>,
    clearTitle: React.Dispatch<React.SetStateAction<string>>
  ) => {
    clearData("");
    clearTitle("");
    navigate(ROUTES.HOME);
  };
  const addNoteData = async (url: string, newNote: NoteType) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote), // Replace with your data
    })
      .then((response: Response) => response.json())
      .then((data: NoteType) => {
        const parsedData = JSON.stringify(data);
        navigate(ROUTES.HOME, { state: { parsedData } });
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  return (
    <TextEditor
      note={note}
      handleDiscard={handleDiscard}
      addNoteData={addNoteData}
    />
  );
};

export default AddNoteComponent;
