const fs = require("fs");
const path = require("./path.jsx");

function escape(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

module.exports = (data) => {
    dir = path(data);
    let status = 0;
    let stdout = "";
    if (!dir) return require("./error.jsx")(data);
    if (!fs.existsSync(dir)) stdout = `<span class='err'>Error:</span> ${dir} doesn't exist`;
    else{
        if (fs.statSync(dir).isDirectory()) stdout = `<span class='err'>Error:</span> ${dir} is a directory`;
        else {
            status = 1;
            stdout = escape(fs.readFileSync(dir, {encoding: "utf-8"}));
        }
    }
    return /*html*/ `<div class='stdout status-${status}'>${stdout}</div>`;
};
