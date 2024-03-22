const fs = require("fs");
const path = require("path");
const path2 = require("./path.jsx");

module.exports = (data) => {
    dir = path2(data);
    let status = 0;
    let stdout = "";
    if (!dir) return require("./error.jsx")(data);
    if (!fs.existsSync(dir)) stdout = `<span class='err'>Error:</span> ${dir} doesn't exist`;
    else {
        const relative = path.relative("./pages/file_system/", dir);
        if (!relative == '') {
            if (fs.statSync(dir).isDirectory()) {
                status = 1;
                fs.rmdirSync(dir);
                stdout = `Successfully removed directory ${dir}`;
            }
            else {
                status = 1;
                fs.rmSync(dir);
                stdout = `Successfully removed file ${dir}`;
            }
        } else {
            stdout = `<span class='err'>Error:</span> ${dir} points to root. Can not remove root`;
        }
    }
    return /*html*/ `<div class='stdout status-${status}'>${stdout}</div>`;
};
