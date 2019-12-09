const fs = require("fs");
const path = require("path");

const generateId = (jsonArray) => {
  if (jsonArray.length === 0) {
    return 1;
  }

  const ids = jsonArray.map(el => el.id);
  const max = Math.max(...ids);
  return max + 1;
};

module.exports.getAll = (jsonFile) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, jsonFile);
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

module.exports.insert = (jsonFile, obj) => {
  const filePath = path.join(__dirname, jsonFile);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const jsonData = JSON.parse(data);
        const id = generateId(jsonData);
        const newObj = { ...obj, id };
        // append the new object into the json data
        const newData = [...jsonData, newObj];

        // write down
        fs.writeFile(filePath, JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            // mark done
            resolve(obj);
          }
        });
      }
    });
  });
}

module.exports.update = (jsonFile, obj) => {
  const filePath = path.join(__dirname, jsonFile);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const jsonData = JSON.parse(data);

        // find the object
        const searchObj = jsonData.find(el => el.id === obj.id);
        const fields = Object.keys(searchObj);

        // update the object
        fields.reduce((acc, field) => {
          searchObj[field] = obj[field];
        });

        // write down
        fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            // mark done
            resolve(obj);
          }
        });
      }
    });
  });
}
