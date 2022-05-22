import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { TYPE_COLORS } from "../constants";
const PieceCard = ({ className = "", piece, onRemove = null }) => {
  if (!piece) return null;
  return (
    <div
      className={classNames(
        className,
        "relative w-28 h-32 flex flex-wrap p-1 justify-center items-center rounded"
      )}
    >
      {onRemove && (
        <FontAwesomeIcon
          className="absolute top-1 right-1 text-red-400 cursor-pointer text-lg z-10"
          onClick={() => onRemove(piece)}
          icon={faCircleCheck}
        />
      )}
      <div className="w-24 h-20 relative flex justify-center ">
        {piece.split("").map((type, index) => (
          <div
            className="absolute h-10 w-12 text-center text-white bg-cover"
            style={{
              backgroundImage:`url('${process.env.PUBLIC_URL}images/${type}.png')`,
              transformOrigin: "center bottom",
              transform: `rotate(calc(${60 * index}deg))`,
              clipPath: `polygon(0% 0%, 50% 100%, 100% 0%)`,
            }}
          >
            {/* {type} */}
          </div>
        ))}
      </div>
      <div className="text-blue-grey-800">{piece}</div>
    </div>
  );
};
export default PieceCard;
