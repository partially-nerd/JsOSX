const path = require("path");

module.exports = (params) => { 
    const parent = "./pages/file_system/";
    params = `${parent}${params.replaceAll('-', '..')}`;
    const relative = path.relative(parent, params);
    const isSubDirectory = (relative == '' ? true : relative) && !relative.startsWith("..") && !path.isAbsolute(relative);
    if (!isSubDirectory){
        return false;
    }
    else {
        return params;
    }
}