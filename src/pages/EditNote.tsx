import { useLocation } from "react-router-dom";
import { EditNoteViz, Footer, Header } from "../components";

const EditNote = () => {
  const location = useLocation();
  const note = location.state; // Access the passed data
  console.log("checked", location.state);
  return (
    <div className="root-container">
      <Header />
      <EditNoteViz note={note} />
      <Footer />
    </div>
  );
};

export default EditNote;
