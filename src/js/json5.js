// 원인은 모르겠지만, 이렇게 해야 JSON5 패키지를 사용할 수 있음
const { default: JSON5 } = require("json5");

module.exports = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  JSON5,
};