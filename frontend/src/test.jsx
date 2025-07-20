import { useState } from "react";
import "./styles/test.css";

function Test() {
  const [coordinates, setCoordinates] = useState({ x: "", y: "" });

  const handleCoordinates = (e) => {
    console.log(e);
  };

  return (
    <div onClick={handleCoordinates} className="where-is-waldo">
      <div class="dot"></div>

      <img src="src/assets/wheres-waldo-beach.jpeg" alt="" />
    </div>
  );
}

export default Test;
