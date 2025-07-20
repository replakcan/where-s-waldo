import { useEffect, useState } from "react";
import "./styles/test.css";

function Test() {
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/targets");

      const targets = await res.json();

      setTargets(targets);
      console.log(targets);
    } catch (error) {
      console.log(error);
    }
  };

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
