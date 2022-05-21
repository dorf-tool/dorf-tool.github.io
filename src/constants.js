const TYPES = ["草", "树", "村", "田", "铁", "河", "湖", "空"];
const TYPE_COLORS = {
  草: "#00a854",
  树: "#f5a623",
  村: "#1890ff",
  田: "#f04134",
  铁: "#722ed1",
  河: "#13c2c2",
  湖: "#3182bd",
  空: "#d9d9d9",
};
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

export { TYPES, TYPE_COLORS, TYPE_REG_STRS, PIECE_LENGTH };
