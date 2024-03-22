module.exports = (head="", body="", css, js) => {
    let links = "";
    css.forEach(stylesheet => links += "<link type='text/css' rel='stylesheet' href='" + stylesheet + "'>");
    let scripts = "";
    js.forEach(script => scripts += "<script type='text/javascript' src='" + script + "'" + (script.includes("defer") ? " defer" : "") + "></script>");
return /*html*/ `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${head}
    ${links}
    ${scripts}
</head>
<body>
    ${body}
</body>
</html>`}