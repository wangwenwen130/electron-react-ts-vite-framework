const endColor = '\x1B[0m';
const colorType = {
  red: '\x1B[31m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  magenta: '\x1B[35m',
  cyan: '\x1B[36m',
  white: '\x1B[37m',
  gray: '\x1B[90m',
};

const color = (() => {
  const textColor = Object.keys(colorType).reduce((pre, color) => {
    pre[color] = (txt) => {
      return colorType[color] + txt + endColor;
    };
    return pre;
  }, {});
  return textColor;
})();

const log = (() => {
  const textColor = Object.keys(colorType).reduce((pre, color) => {
    pre[color] = (txt, ...args) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      console.log(colorType[color] + txt + endColor, ...args);
    };
    return pre;
  }, {});
  return textColor;
})();

module.exports = {
  color,
  log,
};
