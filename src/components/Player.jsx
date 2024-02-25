import { useState } from "react";

export default function Player({initialname, symbol, isActive, onChangeName}) {
  const [playerName, setPlayerName] = useState(initialname)
  const [isEditting, setisEditting] = useState(false)

  function handleChange(event) {
    setPlayerName(event.target.value)
  }
  function enabelEdit() {
    setisEditting((editing) => !editing)

    if (isEditting) {
      onChangeName(symbol, playerName)
    }
  }

  let editplayerName = <span className="player-name">{playerName}</span>

  if (isEditting) {
    editplayerName = <input type="text" required value = {playerName} onChange={handleChange}/>
  }

  return (
    <li className={isActive ? 'active': undefined}>
      <span className="player">
        {editplayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={enabelEdit}>{isEditting ? 'save': 'edit'}</button>
    </li>
  );
}
