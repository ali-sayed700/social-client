import React from "react";
import { useState } from "react";
import "./ReadMore.css";
function ReadMore({ children, maxlength = 100 }) {
  let text = children;

  const [showLess, setShowLess] = useState(true);

  const res = showLess ? `${text.slice(0, maxlength)}` : text;
  const ToggleTurn = () => {
    setShowLess(!showLess);
    if (text.length < maxlength) {
      return <p>{text}</p>;
    }
  };

  return (
    <div className="">
      {/* <p>{showLess ? `${text.slice(0, length)}...` : text}</p> */}
      {<p style={{ margin: "0" }}> {res} </p>}

      {text.length >= maxlength && (
        <span
          style={{ color: "#fca61f", cursor: "pointer" }}
          onClick={ToggleTurn}>
          &nbsp;View {showLess ? "More" : "Less"}
        </span>
      )}
    </div>
  );
}

export default ReadMore;
