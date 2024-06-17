import React, { useContext, useEffect, useState } from "react";
import WaldoGame from "./WaldoGame";
import GlobalContext from "../GlobalContext";
import "./Home.css";
export const Home = () => {
  const { setPage, mockWaldoGames } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const getAllGames = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/games/");
        const data = await response.json();
        console.log(data);
        setAllGames(data.games);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAllGames();
  }, []);

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      <div className="top-bar">
        <img src="logo.svg" alt="logo" className="logo" />
        <h1 className="logo-name">Finding Waldo Game</h1>
      </div>
      <div className="container">
        <div className="images">
          {allGames.map((game) => (
            <div
              key={game._id}
              className="image"
              onClick={() => {
                setPage(
                  <WaldoGame img={`http://localhost:3000/api/game/${game._id}/image`} areas={game.positions}></WaldoGame>
                );
              }}
            >
              <img src={`http://localhost:3000/api/game/${game._id}/thumbnail`} alt="Waldo Game Image" className="thumbnail" />
              <p>{game.description}</p>
              <p className="to-find">
                Characters to find: { game.positions.length }
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
