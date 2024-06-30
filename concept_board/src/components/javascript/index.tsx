import { useNavigate } from "react-router-dom";
import backIcon from "/back.png";
import resetIcon from "/reset.png";
import { useEffect, useState } from "react";
import CardContent from "./card";

const JSComponent = () => {
  const navigate = useNavigate();
  const [jsConcepts, setJsConcepts] = useState<Array<string> | null>(null);
  const [concept, setConcept] = useState<string | null>(null);
  useEffect(() => {
    fetch("/data/concepts.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.jsConcepts) setJsConcepts(data.jsConcepts);
        else {
          console.error("No Js Data found!");
        }
      })
      .catch((error) => console.error("Error fetching the JSON data:", error));
  }, []);
  return (
    <div className="js-content">
      <div className="header">
        <button className="btn back-btn" onClick={() => navigate("/")}>
          <img src={backIcon} className="logo" alt="Back Icon" />
          Back
        </button>
        {concept !== null && (
          <button className="btn clear-btn" onClick={() => setConcept(null)}>
            <img src={resetIcon} className="logo" alt="Back Icon" />
            Clear
          </button>
        )}
      </div>
      <div className={`card-content ${concept !== null ? "show" : "hide"}`}>
        <CardContent name={concept} />
      </div>
      <div className="list-items">
        {jsConcepts?.map((item, index) => {
          return (
            <div
              key={index}
              className={`item-desc ${concept === item ? "on" : "off"}`}
              onClick={() => setConcept(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JSComponent;
