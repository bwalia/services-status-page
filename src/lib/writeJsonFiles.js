const fs = require('fs');
const path = require('path');

const writeJsonFile = (directory, fileName, data) => {
  const filePath = path.join(directory, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = writeJsonFile;
