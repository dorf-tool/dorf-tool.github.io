import { useState, useEffect } from "react";
const TYPES = ["草", "树", "村", "田", "铁", "河", "湖", "空"];
const TYPE_REG_STRS = {
  草: "[草空湖]",
  树: "[树空]",
  村: "[村空]",
  田: "[田空]",
  铁: "[铁空]",
  河: "[河空湖]",
  湖: "[湖空草河]",
};
const PIECE_LENGTH = 6;
const PieceInput = ({
  title = "",
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
    <>
      <p>{title}</p>
      <div className="flex flex-wrap">
        {TYPES.map((type) => {
          if (!hasNull && type === "空") return null;
          return (
            <button
              className=""
              key={type}
              onClick={() => setPiece(piece + type)}
              disabled={piece.length >= PIECE_LENGTH}
            >
              {type}
            </button>
          );
        })}
      </div>
      <p>
        {JSON.stringify(piece)} <button onClick={deleteLast}>移除</button>
      </p>
      <p>
        <button onClick={finish}>完成</button>
      </p>
    </>
  );
};
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
  const removePiece = (index) => {
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
    <>
      <PieceInput title="输入当前需求地块" onFinish={addPiece} />
      {pieces.map((p, index) => (
        <p key={p + index}>{p}</p>
      ))}
      <p>需求地块:</p>
      <PieceInput
        title="输入需要搜索地块"
        onFinish={setPiece}
        hasNull={false}
      />
      {piece && (
        <>
          <p>
            <b>{piece}</b>的匹配结果
          </p>
          {pieces
            .filter((p) => comparePiece(p, piece))
            .map((p, index) => (
              <p key={p + index}>
                <b>{p}</b>
                <button onClick={() => removePiece(index)}>匹配到</button>
              </p>
            ))}
        </>
      )}
    </>
  );
};
export default Tool;
