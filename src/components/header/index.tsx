import { useEffect, useState } from "react";
import "./../style.css";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const HeaderComponent = () => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    // Define the function inside useEffect so that it captures the necessary context
    const updateDate = () => {
      const currentDate = `${new Date().toLocaleDateString(
        "en-US",
        dateOptions
      )} ${new Date().toLocaleTimeString("en-US", timeOptions)}`;
      setDate(currentDate);
    };

    updateDate();

    // Update every second
    const intervalId = setInterval(updateDate, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
    //24 h = 1000*60*60*24
  }, []);
  return (
    <div className="header header-bar">
      <div
        className="section name"
        onClick={(_: React.MouseEventHandler<HTMLDivElement>) =>
          navigate(ROUTES.HOME)
        }
      >
        <img
          className="icon"
          src="https://img.icons8.com/dusk/64/create-new.png"
        />
        <span className="icon-name">-TO-DO</span>
      </div>
      <div className="section date">{date}</div>
    </div>
  );
};

export default HeaderComponent;
