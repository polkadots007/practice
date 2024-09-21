import { SetStateAction, useEffect, useState } from "react";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  MarkCompletedIcon,
  MarkIncompleteIcon,
  DownIcon,
} from "../../helpers/Icons";
import Card from "./../cards";

import { NoteType, UpdatedNoteParams } from "../types";
import {
  DELETE_NOTE_ENDPOINT,
  FETCH_NOTES_ENDPOINT,
  UPDATE_NOTE_ENDPOINT,
} from "../../constants/endpoints";
import * as ROUTES from "../../constants/routes";
import { useNavigate } from "react-router-dom";

async function fetchData(
  url: string,
  setCardData: React.Dispatch<React.SetStateAction<Array<NoteType>>>
) {
  await fetch(url)
    .then((response: Response) => response.json())
    .then((data: Array<NoteType>) => {
      setCardData(data);
    })
    .catch((error: Error) => {
      console.error(error);
    });
}
async function updateNote(url: string, updatedNote: UpdatedNoteParams) {
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
      const { updatedNotes } = data; // The updated note object
      return updatedNotes;
    })
    .catch((error: Error) => {
      console.error(error);
    });
}

async function deleteNote(url: string) {
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(updatedNote), // Replace with your data
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      const { updatedNotes } = data;
      return updatedNotes;
    })
    .catch((error: Error) => {
      console.error(error);
    });
}

const CardContainer = () => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<Array<NoteType>>([]);
  const [selected, setSelected] = useState<Array<number>>([]);

  async function handleDelete(
    selected: Array<number>,
    setSelected: React.Dispatch<React.SetStateAction<Array<number>>>
  ) {
    const promises = selected.map((id: number) =>
      deleteNote(DELETE_NOTE_ENDPOINT + id)
    );
    await Promise.all(promises);
    setSelected([]);
  }

  async function handleComplete(
    selected: Array<number>,
    setSelected: React.Dispatch<React.SetStateAction<Array<number>>>
  ) {
    const promises = selected.map((id: number) =>
      updateNote(UPDATE_NOTE_ENDPOINT + id, {
        status: "Complete",
      })
    );
    await Promise.all(promises);
    setSelected([]);
  }

  async function handleCancel(
    selected: Array<number>,
    setSelected: React.Dispatch<React.SetStateAction<Array<number>>>
  ) {
    const promises = selected.map((id: number) =>
      updateNote(UPDATE_NOTE_ENDPOINT + id, {
        status: "Incomplete",
      })
    );
    await Promise.all(promises);
    setSelected([]);
  }

  useEffect(() => {
    fetchData(FETCH_NOTES_ENDPOINT, setCardData);
  }, [selected]);
  return (
    <div className="container">
      <div className="card-actions menu">
        <div
          className="icon-add icon-box button-primary"
          onClick={(_: React.MouseEvent<HTMLDivElement>) =>
            navigate(ROUTES.ADD, { state: "" })
          }
        >
          <AddIcon />
        </div>
        <div
          className="icon-delete icon-box button-primary"
          onClick={() => handleDelete(selected, setSelected)}
        >
          <DeleteIcon />
        </div>
        <div
          className="icon-rect button-primary"
          onClick={() => handleComplete(selected, setSelected)}
        >
          <div className=" icon-tick">
            <MarkCompletedIcon />
          </div>
          Mark as Completed
        </div>
        <div
          className="icon-rect button-primary"
          onClick={() => handleCancel(selected, setSelected)}
        >
          <div className="icon-cross">
            <MarkIncompleteIcon />
          </div>
          Mark as Canceled
        </div>
      </div>
      <div className="card-container">
        <div className="incomplete-tasks">
          {cardData.length ? (
            cardData
              .filter((note: NoteType) => note.status === "Incomplete")
              .map((note: NoteType) => {
                return (
                  <Card
                    key={note.id}
                    note={note}
                    updateSelected={setSelected}
                  />
                );
              })
          ) : (
            <div className="no-notes">No notes found!</div>
          )}
        </div>
        <div className="completed-cards">
          <span className="section-completed">Completed Tasks</span>
          <div className="completed-tasks">
            {cardData.length &&
              cardData
                .filter((note: NoteType) => note.status === "Complete")
                .map((note: NoteType) => {
                  return (
                    <Card
                      key={note.id}
                      note={note}
                      updateSelected={setSelected}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
