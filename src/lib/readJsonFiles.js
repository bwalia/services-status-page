const fs = require('fs');
const path = require('path');

const readJsonFiles = async (directory, method) => {
    if (method == "update") {
        const files = fs.readdirSync(directory);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        const data = jsonFiles.map(async file => {
            const filePath = path.join(directory, file);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const fileData = JSON.parse(fileContents);
            if (fileData?.ping_api) {
                const pingApi = await fetch(fileData.ping_api);
                if (pingApi.ok) {
                    const resData = await pingApi.json();
                    if (resData.response == "pong" && resData.database == "Database connection is successful.") {
                        fileData.api_database = true;
                    } else {
                        fileData.api_database = false;
                    }
                } else {
                    fileData.api_database = false;
                }
            }
            fs.writeFileSync(path.join(directory, file), JSON.stringify(fileData));
        })
        return data;
    } else if (method == "get") {
        const files = fs.readdirSync(directory);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        const data = jsonFiles.map(file => {
          const filePath = path.join(directory, file);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          return JSON.parse(fileContents);
        });
        return data;
    }
};

module.exports = readJsonFiles;
