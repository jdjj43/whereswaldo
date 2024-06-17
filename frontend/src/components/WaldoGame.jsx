import React, { useContext, useRef, useState } from "react";
import Icon from "@mdi/react";
import {
  mdiMagnifyPlusOutline,
  mdiMagnifyMinusOutline,
  mdiArrowLeft,
  mdiRestart,
} from "@mdi/js";
import { Home } from "./Home";
import GlobalContext from "../GlobalContext";
import './WaldoGame.css';


const WaldoGame = ({ img, areas }) => {
  const {setPage} = useContext(GlobalContext);
  const [selectedArea, setSelectedArea] = useState();
  const [charsFound, setCharsFound] = useState([]);
  const numberFound = useRef(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [win, setWin] = useState(false);

  const resetBoard = () => {
    setCharsFound([]);
    numberFound.current = 0;
    setWin(false);
  };

  const getClickPosition = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    // console.log(x, y);

    areas.map((char) => {
      if (
        x >= char.x &&
        x <= char.x + char.width &&
        y >= char.y &&
        y <= char.y + char.height
      ) {
        if (!charsFound.includes(char)) {
          setCharsFound([...charsFound, char]);
          numberFound.current = numberFound.current + 1;
        } else {
          return;
        }
      }
    });
  };

  const checkGame = () => {
    if (numberFound.current === areas.length) {
      setWin(true);
    }
  };

  const getCoords = (e) => {
    const rect = e.target.getBoundingClientRect();
    // console.log(rect);
    const x = ((e.clientX - rect.left) / (rect.width * zoomLevel)) * 100;
    const y = ((e.clientY - rect.top) / (rect.height * zoomLevel)) * 100;
    // console.log(x, y);
    setSelectedArea(
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: `1.5%`,
          height: `3%`,
          border: "2px solid red",
          pointerEvents: "none",
        }}
      ></div>
    );

    // 68.03169998118351 68.2881326317736 1.5, 3
  };

  return (
    <>
      <div className="scoreBar">
        <div className="icons">
          <Icon path={mdiArrowLeft} size={1} className="icon" onClick={() => {
            setPage(<Home />);
          }} />
          <Icon path={mdiRestart} size={1} onClick={resetBoard} className="icon" />
        </div>
        <div className="icons">
          <Icon
            path={mdiMagnifyPlusOutline}
            size={1}
            onClick={() => {
              setZoomLevel(zoomLevel + 0.1);
            }}
            className="icon"
          />
          <Icon
            path={mdiMagnifyMinusOutline}
            size={1}
            onClick={() => {
              setZoomLevel(zoomLevel > 1 ? zoomLevel - 0.1 : 1);
            }}
            className="icon"
          />
        </div>
        {win ? (
          <p className="win">Congrats! You won!</p>
        ) : (
          <p>Characters left: {areas.length - charsFound.length}</p>
        )}
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
          overflow: "inherit",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
          }}
        >
          <img
            src={img}
            style={{ width: "100%", height: "auto", cursor: "pointer" }}
            onClick={(e) => {
              getClickPosition(e);
              checkGame();
            }}
          />
          {/* {areas.map((char, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${char.x}%`,
                top: `${char.y}%`,
                width: `${char.width}%`,
                height: `${char.height}%`,
                border: "5px solid purple",
                pointerEvents: "none",
              }}
            ></div>
          ))} */}
          {charsFound.map((char, i) => (
            <div
              key={`selected${i}`}
              style={{
                position: "absolute",
                left: `${char.x}%`,
                top: `${char.y}%`,
                width: `${char.width}%`,
                height: `${char.height}%`,
                backgroundColor: "white",
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default WaldoGame;
