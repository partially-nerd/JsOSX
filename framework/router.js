const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(require('sanitize').middleware);
app.get("*", (req, res) => {
    // Ensure no root access or parent directory access
    let URL = req.url.replaceAll("..", "");
    let url = URL.includes("?") ? URL.split("?")[0] : URL;
    let params = URL.includes("?") ? URL.split("?")[1] : "";

    url = "pages/" + url;

    if (fs.existsSync(url) && fs.statSync(url).isFile()) {
        // if not .jsx
        if (!url.includes(".jsx")) {
            res.setHeader('content-type', `text/${url.split(".")[1]}`);
            const data = fs.readFileSync(url);
            res.send(data);
        }
        // if .jsx
        else {
            const data = require(`../${url}`)(params);
            res.send(data);
        }

    } else {
        // 404 bad url
        const data = require("../pages/404.jsx")(params);
        res.send(data);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
