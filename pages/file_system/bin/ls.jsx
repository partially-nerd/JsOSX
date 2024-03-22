const fs = require("fs");
const path = require("./path.jsx");

module.exports = (data_) => {
    data = path(data_);
    let status = 0;
    let stdout = "";
    if (!data) return require("./error.jsx")(data_);
    if (fs.existsSync(data)) {
        if (fs.statSync(data).isFile()) {
            stdout = `<span class='err'>Error:</span> ${data} is a file`
        } else {
            status = 1;
            stdout = fs.readdirSync(data).join("<br>");
        }
    } else stdout = `<span class='err'>Error:</span> ${data} doesn't exist`;
    return /*html*/ `<div class='stdout status-${status}'>${stdout}</div>`;
};
