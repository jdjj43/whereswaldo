import { useState } from "react";
import "./App.css";
import { Home } from "./components/Home";
import GlobalContext from "./GlobalContext";

function App() {
  const [page, setPage] = useState(<Home />);

  const mockWaldoGames = [
    {
      _id: 1,
      positions: [
        { x: 27.2, y: 50.1, width: 1.5, height: 2 },
        { x: 68.03, y: 68.28, width: 1.5, height: 3 },
        { x: 60.76, y: 35.75, width: 1.5, height: 4 },
        { x: 9.82, y: 34.2, width: 1.5, height: 3 },
        { x: 72.37, y: 82.26, width: 1.5, height: 3 },
        { x: 90.6, y: 34.01, width: 1.5, height: 2 },
        { x: 62.92, y: 46.88, width: 1.5, height: 2 },
        { x: 76.4, y: 39.46, width: 1.5, height: 3 },
      ],
      image: "mock2.jpg",
      description: "Find Waldo, Evil Waldo and People with Waldo's hat",
      chars_to_find: 8,
    },
    {
      _id: 2,
      positions: [
        { x: 27.2, y: 50.1, width: 1.5, height: 2 },
        { x: 68.03, y: 68.28, width: 1.5, height: 3 },
        { x: 60.76, y: 35.75, width: 1.5, height: 4 },
        { x: 9.82, y: 34.2, width: 1.5, height: 3 },
        { x: 72.37, y: 82.26, width: 1.5, height: 3 },
        { x: 90.6, y: 34.01, width: 1.5, height: 2 },
        { x: 62.92, y: 46.88, width: 1.5, height: 2 },
        { x: 76.4, y: 39.46, width: 1.5, height: 3 },
      ],
      image: "mock2.jpg",
      description: "Find Waldo, Evil Waldo and People with Waldo's hat",
      chars_to_find: 8,
    },
    {
      _id: 3,
      positions: [
        { x: 27.2, y: 50.1, width: 1.5, height: 2 },
        { x: 68.03, y: 68.28, width: 1.5, height: 3 },
        { x: 60.76, y: 35.75, width: 1.5, height: 4 },
        { x: 9.82, y: 34.2, width: 1.5, height: 3 },
        { x: 72.37, y: 82.26, width: 1.5, height: 3 },
        { x: 90.6, y: 34.01, width: 1.5, height: 2 },
        { x: 62.92, y: 46.88, width: 1.5, height: 2 },
        { x: 76.4, y: 39.46, width: 1.5, height: 3 },
      ],
      image: "mock2.jpg",
      description: "Find Waldo, Evil Waldo and People with Waldo's hat",
      chars_to_find: 8,
    },
    {
      _id: 4,
      positions: [
        { x: 27.2, y: 50.1, width: 1.5, height: 2 },
        { x: 68.03, y: 68.28, width: 1.5, height: 3 },
        { x: 60.76, y: 35.75, width: 1.5, height: 4 },
        { x: 9.82, y: 34.2, width: 1.5, height: 3 },
        { x: 72.37, y: 82.26, width: 1.5, height: 3 },
        { x: 90.6, y: 34.01, width: 1.5, height: 2 },
        { x: 62.92, y: 46.88, width: 1.5, height: 2 },
        { x: 76.4, y: 39.46, width: 1.5, height: 3 },
      ],
      image: "mock2.jpg",
      description: "Find Waldo, Evil Waldo and People with Waldo's hat",
      chars_to_find: 8,
    },
  ];

  return (
    <>
      <GlobalContext.Provider value={{ setPage, mockWaldoGames }}>
        {page}
      </GlobalContext.Provider>
    </>
  );
}

export default App;
