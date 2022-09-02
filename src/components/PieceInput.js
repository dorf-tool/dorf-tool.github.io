import { useState, useEffect } from "react";
import classNames from "classnames";
import PieceCard from "./PieceCard";
import { PIECE_LENGTH, TYPES } from "../constants";
import Button from "./Button";
const PieceInput = ({ defaultPiece = "", onFinish = () => null }) => {
  const [piece, setPiece] = useState(defaultPiece);
  const deleteLast = () => {
    setPiece(piece.slice(0, -1));
  };
  const finish = () => {
    if (!piece) return;
    if (piece.length === PIECE_LENGTH) {
      onFinish(piece);
    } else {
      // 补上空到6位
      onFinish(piece + "空".repeat(PIECE_LENGTH - piece.length));
    }
    reset();
  };
  const reset = () => {
    setPiece(defaultPiece);
  };
  return (
    <div className="flex-shrink-0 nm-flat-blue-grey-100 p-2 rounded-md h-36 grid grid-cols-6 gap-2">
      <div className="col-span-3 grid grid-cols-4 gap-2">
        {TYPES.map((type) => {
          return (
            <Button
              key={type}
              onClick={() => setPiece(piece + type)}
              disabled={piece.length >= PIECE_LENGTH}
            >
              {type}
            </Button>
          );
        })}
      </div>
      <div className="col-span-2">
        <PieceCard piece={piece} />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Button onClick={deleteLast}>移除</Button>
        <Button onClick={finish}>完成</Button>
      </div>
    </div>
  );
};
export default PieceInput;
