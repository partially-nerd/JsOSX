const fs = require("fs");
const path2 = require("./path.jsx");

module.exports = (data) => {
    data = data.replaceAll("%20", " ");
    let [dirN, data_] = data.split(/ (.*)/s);
    dir = path2(dirN);
    let status = 0;
    let stdout = "";
    if (!dir) return require("./error.jsx")(dirN);
    if (fs.existsSync(dir) ? fs.statSync(dir).isDirectory() : false) stdout = `<span class='err'>Error:</span> ${dir} is a directory`;
    else {
        status = 1;
        fs.writeFileSync(dir, data_, { encoding: "utf-8" });
        stdout = `Successfully written ${data_.length} bytes to ${dir}`;
    }
    return /*html*/ `<div class='stdout status-${status}'>${stdout}</div>`;
};
