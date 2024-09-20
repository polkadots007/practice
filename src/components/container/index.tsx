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

import { NoteType } from "../types";
import { FETCH_NOTES_ENDPOINT } from "../../constants/endpoints";
import * as ROUTES from "../../constants/routes";
import { useNavigate } from "react-router-dom";

async function fetchData(
  url: string,
  setCardData: React.Dispatch<React.SetStateAction<Array<NoteType>>>
) {
  await fetch(url)
    .then((response: Response) => response.json())
    .then((data: Array<NoteType>) => {
      console.log("fetched", data);
      setCardData(data);
    })
    .catch((error: Error) => {
      console.error(error);
    });
}

const CardContainer = () => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<Array<NoteType>>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selected, setSelected] = useState<Array<number>>();
  function handleClick(
    event: React.MouseEvent<HTMLDivElement>,
    cardData: Array<NoteType>
  ) {
    if (event.type === "click") {
      console.log("Left click");
    } else if (event.type === "contextmenu") {
      console.log("Right click");
      navigate(ROUTES.EDIT, { state: cardData });
    }
  }
  useEffect(() => {
    fetchData(FETCH_NOTES_ENDPOINT, setCardData);
  }, []);
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
        {/* <div
          className="icon-edit icon-box button-primary"
          onClick={(event: React.MouseEvent<HTMLDivElement>) =>
            handleClick(event, cardData, navigate)
          }
          onContextMenu={(event: React.MouseEvent<HTMLDivElement>) =>
            handleClick(event, cardData, navigate)
          }
        >
          <EditIcon />
        </div> */}
        <div className="icon-delete icon-box button-primary">
          <DeleteIcon />
        </div>
        <div className="icon-rect button-primary">
          <div className=" icon-tick">
            <MarkCompletedIcon />
          </div>
          Mark as Completed
        </div>
        <div className="icon-rect button-primary">
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
                    updateStatus={setShowOptions}
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
                      updateStatus={setShowOptions}
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
