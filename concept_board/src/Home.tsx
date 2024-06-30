import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="js item" onClick={() => navigate("/javascript-board")}>
        {" "}
        <p className="itemContent">JavaScript</p>{" "}
      </div>
      <div className="react item" onClick={() => navigate("/react-board")}>
        {" "}
        <p className="itemContent">React</p>{" "}
      </div>
      <div className="react item" onClick={() => navigate("/ts-board")}>
        {" "}
        <p className="itemContent">Typescript</p>{" "}
      </div>
      <div className="react item" onClick={() => navigate("/testing-board")}>
        {" "}
        <p className="itemContent">Testing</p>{" "}
      </div>
    </div>
  );
};

export default Home;
