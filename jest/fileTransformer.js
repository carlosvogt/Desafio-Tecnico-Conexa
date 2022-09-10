const path = require('path');

module.exports = {
  process(src, filename) {
    const relativeFilePath = path
      .relative(__dirname, filename)
      .replace(/\\/g, '/');
    return `module.exports = {
      testUri: ${JSON.stringify(relativeFilePath)}
    };`;
  },
};
