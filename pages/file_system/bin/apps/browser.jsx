const WindowComponent = require("../../../src/components/window.jsx");

module.exports = (data) => {
    data = data.split("&");
    const win = new WindowComponent(Number(data[0]), Number(data[1]), data[2], "Browser");
    win.innerhtml = /*html*/`
<webview src='https://www.google.com/' style="height: 100%; width: 100%;"></webview>
`;
    return win.asHTML();
}