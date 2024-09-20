import TextEditor from "./Editor";
import { NoteType } from "../types";
import * as ROUTES from "../../constants/routes";
import { useNavigate } from "react-router-dom";

interface EditNoteTypes {
  note?: NoteType;
}
const EditNoteComponent = ({ note }: EditNoteTypes) => {
  const navigate = useNavigate();
  const handleDiscard = (
    clearData: React.Dispatch<React.SetStateAction<string>>,
    clearTitle: React.Dispatch<React.SetStateAction<string>>
  ) => {
    clearData("");
    clearTitle("");
    navigate(ROUTES.HOME);
  };
  const updateNote = async (url: string, updatedNote: NoteType) => {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote), // Replace with your data
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("Response from server:", data);
        const { message, updatedNotes } = data;
        console.log(message); // "Note updated successfully"
        console.log(updatedNotes); // The updated note object
        return updatedNotes;
      })
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
      updateNote={updateNote}
    />
  );
};

export default EditNoteComponent;
