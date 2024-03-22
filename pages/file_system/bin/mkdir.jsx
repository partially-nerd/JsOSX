const fs = require("fs");
const path = require("path");
const path2 = require("./path.jsx");

module.exports = (data) => {
    dir = path2(data);
    let status = 0;
    let stdout = "";
    if (!dir) return require("./error.jsx")(data);
    if (fs.existsSync(dir)) stdout = `<span class='err'>Error:</span> ${dir} already exists`;
    else {
        status = 1;
        fs.mkdirSync(dir);
        stdout = `Successfully made directory ${dir}`;
    }
    return /*html*/ `<div class='stdout status-${status}'>${stdout}</div>`;
};
