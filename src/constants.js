export const TYPES = ["草", "树", "村", "田", "铁", "河", "湖", "空"];
export const TYPE_COLORS = {
  草: "#fff",
  树: "#fff",
  村: "#fff",
  田: "#fff",
  铁: "#fff",
  河: "#fff",
  湖: "#fff",
  空: "#333",
};
export const TYPE_REG_STR = {
  草: "[草空湖]",
  树: "[树空]",
  村: "[村空]",
  田: "[田空]",
  铁: "[铁空]",
  河: "[河空湖]",
  湖: "[湖空草河]",
  空: "[草树村田铁河湖空]",
};
export const PIECE_LENGTH = 6;
