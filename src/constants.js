const TYPES = ["草", "树", "村", "田", "铁", "河", "湖", "空"];
const TYPE_COLORS = {
  草: "#757a39",
  树: "#494723",
  村: "#a84029",
  田: "#d7843e",
  铁: "#583510",
  河: "#afa5b7",
  湖: "#9798b0",
  空: "#fff",
};
const TYPE_REG_STRS = {
  草: "[草空湖]",
  树: "[树空]",
  村: "[村空]",
  田: "[田空]",
  铁: "[铁空]",
  河: "[河空湖]",
  湖: "[湖空草河]",
  空: "[草树村田铁河湖空]",
};
const PIECE_LENGTH = 6;

export { TYPES, TYPE_COLORS, TYPE_REG_STRS, PIECE_LENGTH };
