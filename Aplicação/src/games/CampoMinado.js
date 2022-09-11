import React, { useEffect, useState } from 'react';
import '../css/CampoMinado.css';

import square from './img/square.png'
import emptySquare from './img/stop.png';
import bomb from './img/explosion.png';

import num1 from './img/number1.png';
import num2 from './img/number2.png';
import num3 from './img/number3.png';
import num4 from './img/number4.png';
import num5 from './img/number5.png';
import num6 from './img/number6.png';
import num7 from './img/number7.png';
import num8 from './img/number8.png';

const nums = [emptySquare, num1, num2, num3, num4, num5, num6, num7, num8];
let cellsWithBombs = [];
// redefinir para 0 quando for criar novas posições de bomba
let redefineBombs = 0;

/*
  objCells = [
    {
      position: x x y,
      index: 0,
      hasBeenClicked: false,
      hasBomb: false,
      bombsAround: 0,
      connectedWith: undefined,
    },
    ...
  ]

  connectaded = {
    0: [position1, position2 ...],
    ...
  }

  position: vai servir como nome
  connectdtWith: diz qual nome do obj de celulas vazias que ela pertence, se pertencer a uma
*/

export default function CampoMinado ({ size, bombsAmount }) {
  const [objCells, changeCells] = useState([]);

  const getPositionsArround = (initial, cells) => {
    const initialCell = objCells[initial].position;
    const num1 = Number(initialCell.split('x')[0]);
    const num2 = Number(initialCell.split('x')[1]);

    const key1 = `${num1 - 1}x${num2- 1}`;
    const key2 = `${num1 - 1}x${num2}`;
    const key3 = `${num1 - 1}x${num2 + 1}`;
    const key4 = `${num1}x${num2 - 1}`;
    const key6 = `${num1}x${num2 + 1}`;
    const key7 = `${num1 + 1}x${num2 - 1}`;
    const key8 = `${num1 + 1}x${num2}`;
    const key9 = `${num1 + 1}x${num2 + 1}`;
    const keys = [key1, key2, key3, key4, key6, key7, key8, key9];

    keys.forEach((position) => {
      objCells.forEach((cell, i) => {
        if (position === cell.position && cell) {
          const cellChanged = {
            ...cell,
            bombsAround: cell.bombsAround + 1,
          }
          cells.splice(i, 1, cellChanged);
          console.log(cell);
        };
      });
    });
    return keys;
  };

  useEffect(() => {
    if (redefineBombs === 1) {
      while (cellsWithBombs.length < bombsAmount) {
        const newNumber = Math.floor(Math.random() * (size * size));
        !cellsWithBombs.includes(newNumber) && cellsWithBombs.push(newNumber);
      };
      console.log(cellsWithBombs);
      const cells = [...objCells];
      cellsWithBombs.forEach((cellNumber) => {
        const cellChanged = {
          ...cells[cellNumber],
          hasBomb: true,
        };
        cells.splice(cellNumber, 1, cellChanged);
        getPositionsArround(cellNumber, cells);
      });
      changeCells(cells);
    }
    redefineBombs += 1;
  }, [objCells])

  useEffect(() => {
    changeCells([]);
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        changeCells((prev) =>{
          return ([
            ...prev,
            {
              position: `${x}x${y}`,
              hasBeenClicked: false,
              hasBomb: false,
              bombsAround: 0,
              connectedWith: undefined,
            },
          ])
        });
      };
    };
  }, []);

  const handleClick = (cell, i) => {
    const cellChanged = {
      ...cell,
      hasBeenClicked: true,
    };
    const cells = [...objCells];
    cells.splice(i, 1, cellChanged)
    changeCells(cells);
  };

  return (
    <main
      className="divCells"
    >
      {
        objCells.map((cell, i) => {
          return (
            !cell.hasBeenClicked ? (
              cell.hasBomb ? (
                <img
                  key={ cell.position }
                  className="cell"
                  alt="cell"
                  src={ bomb }
                />
              ) : (
                <img
                  key={ cell.position }
                  className="cell"
                  alt="cell"
                  src={ nums[cell.bombsAround] }
                />
              )
            ) : (
              <img
                key={ cell.position }
                className="cell"
                alt="cell"
                src={ square }
                onClick={ () => handleClick(cell, i) }
              />
            )
          )
        })
      }
    </main>
  );
};
