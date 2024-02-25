import { useState } from "react";
import Log from "./components/Log";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { WINNING_COMBINATIONS } from "./components/winning-combonations"
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [players, setplayers] = useState({
    X: 'Player 1',
    Y: 'Player 2',
  })
  const [activePlayer, setactivePlayer] = useState("X");
  const [gameTurns, setgameTurns] = useState([]);

  let gameBoard = [...initialGameBoard].map(array => [...array]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner

  for (const combonation of WINNING_COMBINATIONS) {
    const firstSymbol= gameBoard[combonation[0].row][combonation[0].column]
    const secondSymbol= gameBoard[combonation[1].row][combonation[1].column] 
    const thirdSymbol = gameBoard[combonation[2].row][combonation[2].column]

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
        winner = players[firstSymbol]
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner
  function handleSelectedSquare(rowIndex, colIndex) {
    setactivePlayer((curPlayer) => (curPlayer === "X" ? "O" : "X"));
    setgameTurns((prevTurns) => {
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function rematch() {
    setgameTurns([])
  }
  
  function changeName(symbol, newName) {
    setplayers(prevPlayer => {
      return{
        ...prevPlayer, 
        [symbol]: newName 
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialname="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={changeName}
          />
          <Player
            initialname="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={changeName}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={rematch}/>}
        <GameBoard
          onSelectSquare={handleSelectedSquare}
          board = {gameBoard}
        />
      </div>
    </main>
  );
}

export default App;
