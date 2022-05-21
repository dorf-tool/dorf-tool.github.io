import { useState, useEffect } from "react";
import classNames from "classnames";
import PieceCard from "./PieceCard";
import { PIECE_LENGTH, TYPES } from "../constants";
const PieceInput = ({
  className = "",
  buttonClassName = "",
  defaultPiece = "",
  onFinish = () => null,
  hasNull = true,
}) => {
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
    <div className={classNames(className, "h-36 grid grid-cols-6 gap-2")}>
      <div className="col-span-3 grid grid-cols-4 gap-2">
        {TYPES.map((type) => {
          if (!hasNull && type === "空") return null;
          return (
            <button
              className={classNames(buttonClassName, "col-span-1 rounded")}
              key={type}
              onClick={() => setPiece(piece + type)}
              disabled={piece.length >= PIECE_LENGTH}
            >
              {type}
            </button>
          );
        })}
      </div>
      <div className="col-span-2">
        <PieceCard piece={piece} />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <button
          className={classNames(buttonClassName, "col-span-1 rounded bg-red-300")}
          onClick={deleteLast}
        >
          移除
        </button>
        <button
          className={classNames(buttonClassName, "col-span-1 rounded")}
          onClick={finish}
        >
          完成
        </button>
      </div>
    </div>
  );
};
export default PieceInput;
