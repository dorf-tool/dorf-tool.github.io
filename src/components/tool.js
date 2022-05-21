import { useState, useEffect } from "react";
import PieceCard from "./PieceCard";
import PieceInput from "./PieceInput";
import { TYPE_REG_STRS } from "../constants";

const Tool = () => {
  const [pieces, setPieces] = useState(
    localStorage.getItem("pieces")
      ? JSON.parse(localStorage.getItem("pieces"))
      : []
  );
  const [piece, setPiece] = useState("");
  const addPiece = (piece) => {
    setPieces([...pieces, piece]);
  };
  const removePiece = (piece) => {
    const index = pieces.indexOf(piece);
    setPieces(pieces.filter((_, i) => i !== index));
  };

  const comparePiece = (a, b) => {
    // a循环拼接翻倍
    const aStr = a + a;
    const bRegStr = b
      .split("")
      .map((c) => TYPE_REG_STRS[c])
      .join("");
    const bReg = new RegExp(bRegStr);
    const result = aStr.match(bReg);
    return result && result.length > 0;
  };
  useEffect(() => {
    // 缓存pieces
    localStorage.setItem("pieces", JSON.stringify(pieces));
  }, [pieces]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 absolute inset-0 h-screen w-screen p-2 bg-blue-grey-100">
      <div className="col-span-1 flex flex-col h-full overflow-hidden rounded-lg bg-blue-grey-200 p-2">
        <p className="text-lg font-sans font-semibold text-blue-grey-800">
          输入当前需求地块
        </p>
        <PieceInput
          onFinish={addPiece}
          className="bg-blue-grey-300 p-2 rounded-md"
          buttonClassName="bg-blue-grey-200 text-blue-grey-800"
        />
        <p className="text-lg font-sans font-semibold text-blue-grey-800">
          需求地块
        </p>
        <div className="flex-auto w-full flex flex-wrap content-start justify-center overflow-auto bg-blue-grey-300 p-2 rounded-md">
          {pieces.map((p, index) => (
            <PieceCard
              className="bg-blue-grey-200 m-1"
              key={p + index}
              piece={p}
            />
          ))}
        </div>
      </div>
      <div className="col-span-1 flex flex-col h-full overflow-hidden rounded-lg bg-blue-grey-200 p-2">
        <p className="text-lg font-sans font-semibold text-blue-grey-800">
          输入匹配地块
        </p>
        <PieceInput
          onFinish={setPiece}
          hasNull={false}
          className="bg-blue-grey-300 p-2 rounded-md"
          buttonClassName="bg-blue-grey-200 text-blue-grey-800"
        />
        <p className="text-lg font-sans font-semibold text-blue-grey-800">
          匹配地块
        </p>
        <div className="h-36 bg-blue-grey-300 p-2 rounded-md">
          <PieceCard piece={piece} />
        </div>
        <p className="text-lg font-sans font-semibold text-blue-grey-800">
          匹配结果
        </p>
        <div className="flex-auto w-full flex flex-wrap content-start justify-center overflow-auto bg-blue-grey-300 p-2 rounded-md">
          {piece &&
            pieces
              .filter((p) => comparePiece(p, piece))
              .map((p, index) => (
                <PieceCard
                  className="bg-blue-grey-200 m-1"
                  key={p + index}
                  piece={p}
                  onRemove={removePiece}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
export default Tool;
