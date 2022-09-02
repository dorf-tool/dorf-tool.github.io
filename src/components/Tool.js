import { useState, useEffect } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import PieceCard from "./PieceCard";
import PieceInput from "./PieceInput";
import Button from "./Button";
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
  const clearPieces = () => {
    // confirm确认是否清空pieces
    const r = window.confirm("是否清空地块");
    if (r) {
      setPieces([]);
    }
  };
  const moveToPieces = () => {
    setPieces([...pieces, piece]);
    setPiece("");
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 absolute inset-0 h-screen w-screen p-2 nm-flat-blue-grey-100 ">
      {/* 左 */}
      <div className="col-span-1 flex flex-col  overflow-auto md:overflow-hidden rounded-lg p-2 ">
        <p className="text-lg font-sans font-semibold text-blue-grey-800">
          输入当前需求地块
        </p>
        <PieceInput onFinish={addPiece} />
        <p className="text-lg font-sans font-semibold text-blue-grey-800">
          需求地块
        </p>
        <div className="flex-auto w-full flex flex-wrap content-start justify-center md:overflow-auto nm-flat-blue-grey-100 p-2 rounded-md relative">
          {pieces.length > 0 && (
            <FontAwesomeIcon
              className="absolute top-1 right-1 text-red-400 cursor-pointer text-lg z-10"
              onClick={clearPieces}
              icon={faTrashCan}
            />
          )}
          {pieces.map((p, index) => (
            <PieceCard
              matched={
                piece &&
                pieces.filter((p) => comparePiece(p, piece)).includes(p)
              }
              key={p + index}
              piece={p}
              onRemove={removePiece}
            />
          ))}
        </div>
      </div>
      {/* 右 */}
      <div className="col-span-1 flex flex-col overflow-auto md:overflow-hidden rounded-lg  p-2">
        <p className="text-lg font-sans font-semibold text-blue-grey-800">
          输入匹配地块
        </p>
        <PieceInput onFinish={setPiece} />
        <p className="text-lg font-sans font-semibold text-blue-grey-800">
          匹配地块
        </p>
        <div className="h-36 nm-flat-blue-grey-100 p-2 rounded-md flex  items-center">
          <PieceCard piece={piece} />
          {piece && <Button onClick={moveToPieces}>添加到需求</Button>}
        </div>
        <p className="text-lg font-sans font-semibold text-blue-grey-800">
          匹配结果
        </p>
        <div className="flex-auto w-full flex flex-wrap content-start  md:overflow-auto nm-flat-blue-grey-100 p-2 rounded-md">
          {piece &&
            pieces
              .filter((p) => comparePiece(p, piece))
              .map((p, index) => (
                <PieceCard key={p + index} piece={p} onRemove={removePiece} />
              ))}
        </div>
      </div>
      <iframe
        className="fixed bottom-4 right-4 w-40 h-8"
        title="GitHub"
        src="https://ghbtns.com/github-btn.html?user=dorftool&repo=dorftool.github.io&type=star&count=true&size=large&v=2"
        frameBorder="0"
        scrolling="0"
      ></iframe>
    </div>
  );
};
export default Tool;
