const WindowComponent = require("../../../src/components/window.jsx");
const fs = require("fs");

module.exports = (data) => {
    data = data.split("&");
    let userName = "guest";
    // Note: fs module uses absolute path
    if (fs.existsSync("./pages/file_system/home/")) {
        userName = fs.readdirSync("./pages/file_system/home/")[0];
    }
    const terminal = new WindowComponent(Number(data[0]), Number(data[1]), data[2], "Terminal");
    const commandLinePrefix = `[[ user://${userName} ]]`;
    const prefix = `<span class=\\'command-entry-prefix\\'>${commandLinePrefix}</span>`;
    const execCommand = /*js*/`
const url = this.value.includes(' ') ? this.value.split(/ (.*)/s) : [this.value, ''];
const bin = url[0];
const params = url[1];
this.parentElement.insertAdjacentHTML('beforebegin', '${prefix} ' + this.value + httpGet('file_system/bin/' + bin + '.jsx' + '?' + params))
this.parentElement.parentElement.scrollTo(0, this.parentElement.parentElement.scrollHeight);`

    terminal.append(/*html*/`
<img onerror="setTimeout(() => {$('.active-window').querySelector('.command-entry').focus()}, 200);" src="" pseudoelement="" style="display:none">
<div class="scrollable" onclick="$('.active-window').querySelector('.command-entry').focus();">
    <div class="command-entry-line">
        <span class='command-entry-prefix'>${commandLinePrefix}</span>
        <input type="text" class="command-entry" spellcheck="false" onkeyup="if (event.key == 'Enter') {${execCommand}}">
    </div>
</div>
`);

    return terminal.asHTML();
}