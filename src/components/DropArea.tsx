import React, { useState } from "react";
import "./DropArea.css";

interface DropAreaProps {
  onDrop: () => void;
}

const DropArea: React.FC<DropAreaProps> = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      className={showDrop ? "drop_area" : "hide_drop"}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      Drop Here
    </section>
  );
};

export default DropArea;
