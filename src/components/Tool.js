import { useState, useEffect } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import PieceCard from "./PieceCard";
import PieceInput from "./PieceInput";
import Button from "./Button";
import { TYPE_REG_STRS } from "../constants";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// 需求地块
const requirePiecesAtom = atomWithStorage("pieces", []);
// 待匹配地块
const matchPieceAtom = atomWithStorage("matchPieceAtom", "");

const Title = ({ children, ...props }) => {
  return (
    <div
      className="text-lg font-sans font-semibold text-blue-grey-800 p-1"
      {...props}
    >
      {children}
    </div>
  );
};

const Tool = () => {
  const [requirePieces, setRequirePieces] = useAtom(requirePiecesAtom);
  const [matchPiece, setMatchPiece] = useAtom(matchPieceAtom);

  // 输入后添加到需求地块
  const addPiece = (piece) => {
    setRequirePieces([...requirePieces, piece]);
  };

  // 从需求地块内删除
  const removePiece = (piece) => {
    const index = requirePieces.indexOf(piece);
    setRequirePieces(requirePieces.filter((_, i) => i !== index));
  };
  // 清空需求地块
  const clearPieces = () => {
    // confirm确认是否清空pieces
    const r = window.confirm("是否清空地块");
    if (r) {
      setRequirePieces([]);
    }
  };

  // 将待匹配地块移动到需求地块
  const moveToPieces = () => {
    setRequirePieces([...requirePieces, matchPiece]);
    setMatchPiece("");
  };

  // 对比地块
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 absolute inset-0 h-screen w-screen p-2 nm-flat-blue-grey-100 ">
      {/* 左 */}
      <div className="col-span-1 flex flex-col overflow-auto md:overflow-hidden rounded-lg p-2">
        <Title>输入当前需求地块</Title>
        <PieceInput onFinish={addPiece} />
        <Title>需求地块</Title>
        <div className="flex-auto w-full flex flex-wrap content-start justify-center md:overflow-auto nm-flat-blue-grey-100 p-2 rounded-md relative gap-3">
          {requirePieces.length > 0 && (
            <FontAwesomeIcon
              className="absolute top-1 right-1 text-red-400 cursor-pointer text-lg z-10"
              onClick={clearPieces}
              icon={faTrashCan}
            />
          )}
          {requirePieces.map((p, index) => (
            <PieceCard
              matched={
                matchPiece &&
                requirePieces
                  .filter((p) => comparePiece(p, matchPiece))
                  .includes(p)
              }
              key={p + index}
              piece={p}
              onRemove={removePiece}
            />
          ))}
        </div>
      </div>
      {/* 右 */}
      <div className="col-span-1 flex flex-col overflow-auto md:overflow-hidden rounded-lg p-2">
        <Title>输入匹配地块</Title>
        <PieceInput onFinish={setMatchPiece} />
        <Title>匹配地块</Title>
        <div className="h-36 nm-flat-blue-grey-100 p-2 rounded-md flex  items-center">
          {matchPiece && (
            <>
              <PieceCard piece={matchPiece} />
              <Button onClick={moveToPieces}>添加到需求</Button>
            </>
          )}
        </div>
        <Title>匹配结果</Title>
        <div className="flex-auto w-full flex flex-wrap content-start md:overflow-auto nm-flat-blue-grey-100 p-2 rounded-md gap-3">
          {matchPiece &&
            requirePieces
              .filter((p) => comparePiece(p, matchPiece))
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
