import { useState } from "react";
import "./styles/test.css";

function Test() {
  const [coordinates, setCoordinates] = useState({ x: "", y: "" });

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setCoordinates({ x, y });
    console.log("Normalized: ", x.toFixed(3), y.toFixed(3));
  };

  return (
    <div className="where-is-waldo">
      <img
        onClick={handleImageClick}
        src="src/assets/wheres-waldo-beach.jpeg"
        alt=""
      />
    </div>
  );
}

export default Test;
